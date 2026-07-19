const TOTAL_LESSONS = 8;

function createEmptyHomework(){

    return Array(TOTAL_LESSONS).fill(0);

}

let students = [

{
    name:"Đoàn Chí Thiện",
    homework:[1,1,0,0,0,0,0,0]
},

{
    name:"Lê Trương Minh Long",
    homework:createEmptyHomework()
}

];

function render(){

    let html="<tr>";

    html+="<th>HỌC VIÊN</th>";

    for(let i=1;i<=TOTAL_LESSONS;i++){

        html+="<th>Buổi "+i+"</th>";

    }

    html+="<th>Xóa</th>";

    html+="</tr>";

    students.forEach((student,index)=>{

        html+="<tr>";

        html+=`
        <td>

            <input
            type="text"
            value="${student.name}"
            oninput="students[${index}].name=this.value">

        </td>
        `;

        student.homework.forEach((value,lesson)=>{

            html+=`
            <td>

                <label>

                    <input
                    type="checkbox"

                    ${value?"checked":""}

                    onchange="
                    students[${index}].homework[${lesson}]
                    =this.checked?1:0;

                    render();
                    ">

                    <div class="${value?"ok":"no"}">

                    ${value?"Đã nộp":"Chưa nộp"}

                    </div>

                </label>

            </td>
            `;

        });

        html+=`
        <td>

            <button
            class="del"

            onclick="removeStudent(${index})">

            🗑

            </button>

        </td>
        `;

        html+="</tr>";

    });

    document.getElementById("tbl").innerHTML=html;

}

function addStudent(){

    students.push({

        name:"Học viên mới",

        homework:createEmptyHomework()

    });

    render();

}

function removeStudent(index){

    if(confirm("Bạn có chắc muốn xóa học viên này?")){

        students.splice(index,1);

        render();

    }

}

function showJSON(){

    const box=document.getElementById("json");

    box.style.display="block";

    box.textContent=JSON.stringify(students,null,4);

}

render();