let students = [

{
    name:"Đoàn Chí Thiện",
    homework:[1,1,0,0,0,0,0,0]
},

{
    name:"Lê Trương Minh Long",
    homework:[0,0,0,0,0,0,0,0]
}

];

function render(){

    const tbl=document.getElementById("tbl");

    if(!tbl){

        console.error("render(): table element '#tbl' was not found; cannot render students.");

        return;

    }

    let html="<tr>";

    html+="<th>HỌC VIÊN</th>";

    for(let i=1;i<=8;i++){

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

    tbl.innerHTML=html;

}

function addStudent(){

    students.push({

        name:"Học viên mới",

        homework:[0,0,0,0,0,0,0,0]

    });

    render();

}

function removeStudent(index){

    if(index<0 || index>=students.length){

        console.error(`removeStudent(): invalid index ${index}; expected 0..${students.length-1}.`);

        return;

    }

    if(confirm("Bạn có chắc muốn xóa học viên này?")){

        students.splice(index,1);

        render();

    }

}

function showJSON(){

    const box=document.getElementById("json");

    if(!box){

        console.error("showJSON(): element '#json' was not found.");

        return;

    }

    box.style.display="block";

    box.textContent=JSON.stringify(students,null,4);

}

render();