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

    const table=document.getElementById("tbl");

    table.textContent="";

    const headRow=document.createElement("tr");

    const nameHead=document.createElement("th");
    nameHead.textContent="HỌC VIÊN";
    headRow.appendChild(nameHead);

    for(let i=1;i<=8;i++){

        const th=document.createElement("th");
        th.textContent="Buổi "+i;
        headRow.appendChild(th);

    }

    const delHead=document.createElement("th");
    delHead.textContent="Xóa";
    headRow.appendChild(delHead);

    table.appendChild(headRow);

    students.forEach((student,index)=>{

        const row=document.createElement("tr");

        const nameCell=document.createElement("td");
        const nameInput=document.createElement("input");
        nameInput.type="text";
        nameInput.value=student.name;
        nameInput.addEventListener("input",function(){
            students[index].name=this.value;
        });
        nameCell.appendChild(nameInput);
        row.appendChild(nameCell);

        student.homework.forEach((value,lesson)=>{

            const cell=document.createElement("td");
            const label=document.createElement("label");

            const checkbox=document.createElement("input");
            checkbox.type="checkbox";
            checkbox.checked=!!value;

            const status=document.createElement("div");
            status.className=value?"ok":"no";
            status.textContent=value?"Đã nộp":"Chưa nộp";

            checkbox.addEventListener("change",function(){
                students[index].homework[lesson]=this.checked?1:0;
                render();
            });

            label.appendChild(checkbox);
            label.appendChild(status);
            cell.appendChild(label);
            row.appendChild(cell);

        });

        const delCell=document.createElement("td");
        const delButton=document.createElement("button");
        delButton.className="del";
        delButton.textContent="🗑";
        delButton.addEventListener("click",function(){
            removeStudent(index);
        });
        delCell.appendChild(delButton);
        row.appendChild(delCell);

        table.appendChild(row);

    });

}

function addStudent(){

    students.push({

        name:"Học viên mới",

        homework:[0,0,0,0,0,0,0,0]

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