// ==============================
// QUIZ BUTTON
// ==============================

function startQuiz(){

    alert("The quiz section will be available soon!");

}


// ==============================
// 3D CARD EFFECT + BLOB PARALLAX
// ==============================

const card = document.querySelector(".container");

const blobs=document.querySelectorAll(".blob");

document.addEventListener("mousemove",(e)=>{

    const cardX = (window.innerWidth/2 - e.clientX)/40;

    const cardY = (window.innerHeight/2 - e.clientY)/40;

    card.style.transform=
    `rotateY(${-cardX}deg) rotateX(${cardY}deg)`;

    const blobX=e.clientX/window.innerWidth;

    const blobY=e.clientY/window.innerHeight;

    blobs.forEach((blob,index)=>{

        const speed=(index+1)*12;

        blob.style.transform=
        `translate(${blobX*speed}px,${blobY*speed}px)`;

    });

});

document.addEventListener("mouseleave",()=>{

    card.style.transform="rotateX(0deg) rotateY(0deg)";

});


// ==============================
// RIPPLE EFFECT
// ==============================

document.querySelectorAll(".btn").forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const d=Math.max(this.clientWidth,this.clientHeight);

        circle.style.width=d+"px";

        circle.style.height=d+"px";

        circle.style.left=
        (e.offsetX-d/2)+"px";

        circle.style.top=
        (e.offsetY-d/2)+"px";

        circle.classList.add("ripple");

        this.appendChild(circle);

        setTimeout(()=>{

            circle.remove();

        },600);

    });

});


// ==============================
// FADE IN FEATURES
// ==============================

const features=document.querySelectorAll(".feature");

features.forEach((item,index)=>{

    item.style.opacity="0";

    item.style.transform="translateY(30px)";

    setTimeout(()=>{

        item.style.transition=".7s";

        item.style.opacity="1";

        item.style.transform="translateY(0px)";

    },300+index*180);

});


// ==============================
// FLOATING TITLE
// ==============================

const title=document.querySelector("h1");

let t=0;

setInterval(()=>{

    t+=0.05;

    title.style.transform=
    `translateY(${Math.sin(t)*3}px)`;

},30);



// ==============================
// RANDOM GLOW
// ==============================

setInterval(()=>{

    card.style.boxShadow=

    `0 30px 70px rgba(0,0,0,.18),

     0 0 ${20+Math.random()*20}px rgba(229,57,53,.15)`;

},1200);



// ==============================
// BUTTON HOVER SOUND (OPTIONAL)
// ==============================

// Có thể thêm âm thanh sau này.



console.log("Learning Hub Loaded Successfully!");