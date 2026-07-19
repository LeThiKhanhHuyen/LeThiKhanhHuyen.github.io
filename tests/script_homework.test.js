/**
 * @jest-environment jsdom
 */

const path = require("path");

const MODULE_PATH = path.join(__dirname, "..", "script_homework.js");

function setupDom() {
    document.body.innerHTML = `
        <table id="tbl"></table>
        <pre id="json"></pre>
    `;
}

function loadModule() {
    let mod;
    jest.isolateModules(() => {
        mod = require(MODULE_PATH);
    });
    return mod;
}

describe("script_homework.js", () => {

    beforeEach(() => {
        setupDom();
    });

    describe("initial data", () => {

        test("seeds two students with 8 homework slots each", () => {
            const { students } = loadModule();

            expect(students).toHaveLength(2);
            expect(students[0].name).toBe("Đoàn Chí Thiện");
            expect(students[1].name).toBe("Lê Trương Minh Long");

            students.forEach((student) => {
                expect(student.homework).toHaveLength(8);
            });

            expect(students[0].homework).toEqual([1, 1, 0, 0, 0, 0, 0, 0]);
            expect(students[1].homework).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
        });
    });

    describe("render()", () => {

        test("builds a header row with the 8 lesson columns", () => {
            const { render } = loadModule();
            render();

            const headers = document.querySelectorAll("#tbl th");
            const headerText = Array.from(headers).map((th) => th.textContent);

            expect(headerText[0]).toBe("HỌC VIÊN");
            expect(headerText).toContain("Buổi 1");
            expect(headerText).toContain("Buổi 8");
            expect(headerText[headerText.length - 1]).toBe("Xóa");
        });

        test("renders one row per student plus the header row", () => {
            const { render, students } = loadModule();
            render();

            const rows = document.querySelectorAll("#tbl tr");
            expect(rows).toHaveLength(students.length + 1);
        });

        test("labels submitted lessons 'Đã nộp' and missing ones 'Chưa nộp'", () => {
            const { render } = loadModule();
            render();

            expect(document.querySelectorAll("#tbl .ok")).toHaveLength(2);
            const html = document.getElementById("tbl").innerHTML;
            expect(html).toContain("Đã nộp");
            expect(html).toContain("Chưa nộp");
        });

        test("reflects the current name in each text input", () => {
            const { render } = loadModule();
            render();

            const firstInput = document.querySelector("#tbl input[type='text']");
            expect(firstInput.value).toBe("Đoàn Chí Thiện");
        });
    });

    describe("addStudent()", () => {

        test("appends a new student with a blank homework record and re-renders", () => {
            const { addStudent, students } = loadModule();
            addStudent();

            expect(students).toHaveLength(3);
            expect(students[2].name).toBe("Học viên mới");
            expect(students[2].homework).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);

            const rows = document.querySelectorAll("#tbl tr");
            expect(rows).toHaveLength(students.length + 1);
        });
    });

    describe("removeStudent()", () => {

        test("removes the student at the index when the user confirms", () => {
            const { removeStudent, students } = loadModule();
            window.confirm = jest.fn(() => true);

            removeStudent(0);

            expect(window.confirm).toHaveBeenCalledTimes(1);
            expect(students).toHaveLength(1);
            expect(students[0].name).toBe("Lê Trương Minh Long");
        });

        test("keeps the student when the user cancels", () => {
            const { removeStudent, students } = loadModule();
            window.confirm = jest.fn(() => false);

            removeStudent(0);

            expect(window.confirm).toHaveBeenCalledTimes(1);
            expect(students).toHaveLength(2);
        });
    });

    describe("showJSON()", () => {

        test("reveals the box and fills it with pretty-printed student JSON", () => {
            const { showJSON, students } = loadModule();
            showJSON();

            const box = document.getElementById("json");
            expect(box.style.display).toBe("block");
            expect(box.textContent).toBe(JSON.stringify(students, null, 4));
        });
    });
});
