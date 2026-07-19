/**
 * @jest-environment jsdom
 */

const path = require("path");

const MODULE_PATH = path.join(__dirname, "..", "script.js");

function setupDom() {
    document.body.innerHTML = `
        <h1>Learning Hub</h1>
        <div class="container">
            <span class="blob"></span>
            <span class="blob"></span>
            <button class="btn">A</button>
            <div class="feature">f1</div>
            <div class="feature">f2</div>
        </div>
    `;
}

function loadModule() {
    let mod;
    jest.isolateModules(() => {
        mod = require(MODULE_PATH);
    });
    return mod;
}

describe("script.js", () => {

    beforeEach(() => {
        jest.useFakeTimers();
        setupDom();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    describe("startQuiz()", () => {

        test("alerts that the quiz is not ready yet", () => {
            const { startQuiz } = loadModule();
            const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

            startQuiz();

            expect(alertMock).toHaveBeenCalledWith("The quiz section will be available soon!");
            alertMock.mockRestore();
        });
    });

    describe("3D card effect", () => {

        test("tilts the card based on cursor position on mousemove", () => {
            loadModule();
            const card = document.querySelector(".container");

            const event = new window.MouseEvent("mousemove", { clientX: 0, clientY: 0 });
            document.dispatchEvent(event);

            expect(card.style.transform).toMatch(/rotateY\(.*deg\) rotateX\(.*deg\)/);
        });

        test("resets the card tilt on mouseleave", () => {
            loadModule();
            const card = document.querySelector(".container");

            document.dispatchEvent(new window.MouseEvent("mouseleave"));

            expect(card.style.transform).toBe("rotateX(0deg) rotateY(0deg)");
        });
    });

    describe("blob parallax", () => {

        test("translates each blob on mousemove", () => {
            loadModule();
            const blobs = document.querySelectorAll(".blob");

            document.dispatchEvent(new window.MouseEvent("mousemove", { clientX: 100, clientY: 50 }));

            blobs.forEach((blob) => {
                expect(blob.style.transform).toMatch(/^translate\(.*px,.*px\)$/);
            });
        });
    });

    describe("ripple effect", () => {

        test("adds a ripple span on click and removes it after 600ms", () => {
            loadModule();
            const button = document.querySelector(".btn");

            button.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));

            const ripple = button.querySelector("span.ripple");
            expect(ripple).not.toBeNull();

            jest.advanceTimersByTime(600);
            expect(button.querySelector("span.ripple")).toBeNull();
        });
    });

    describe("fade-in features", () => {

        test("starts each feature hidden and shifted down, then reveals it", () => {
            loadModule();
            const features = document.querySelectorAll(".feature");

            features.forEach((feature) => {
                expect(feature.style.opacity).toBe("0");
                expect(feature.style.transform).toBe("translateY(30px)");
            });

            jest.runOnlyPendingTimers();

            features.forEach((feature) => {
                expect(feature.style.opacity).toBe("1");
                expect(feature.style.transform).toBe("translateY(0px)");
            });
        });
    });
});
