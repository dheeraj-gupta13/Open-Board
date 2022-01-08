let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let allPencilColor = document.querySelectorAll(".pencil-color"); 
let pWidth = document.querySelector(".pencil-width");
let eWidth = document.querySelector(".erasor-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");


let pencilColor = "red"; // Current color of the pencil,  by default red.
let pencilWidth = pWidth.value; // Current width of the pencil,  by default 3.
let erasorColor = "white" // Color of erasor
let erasorWidth = eWidth.value; // Current width of the pencil,  by default 3.

let tool = canvas.getContext("2d");
tool.strokeStyle = pencilColor;
tool.lineWidth= pencilWidth;


let undoRedoTracker = []; // for Undo and Redo
let track = 0;


// Draw on canvas
let mouseDown = false;
canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
    beginPath({
        x : e.clientX,
        y : e.clientY
    })
});
canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){
        drawStoke({
            x : e.clientX,
            y : e.clientY,
            color: (openErasor) ? erasorColor : pencilColor,
            width: (openErasor) ? erasorWidth : pencilWidth
        })
    }
});
canvas.addEventListener("mouseup",(e)=>{
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
});


function beginPath(stokeObj){
    tool.beginPath();
    tool.moveTo(stokeObj.x, stokeObj.y);
}

function drawStoke(stokeObj){
    tool.lineTo(stokeObj.x, stokeObj.y);
    tool.stroke();
    tool.lineWidth = stokeObj.width;
    tool.strokeStyle = stokeObj.color;
}



// Pencil 
allPencilColor.forEach((color)=>{
    color.addEventListener("click",(e)=>{

        if(openErasor){
            openErasor = false;
            erasorCont.style.display = "none";
        }

        let currentColor = color.classList[0];
        pencilColor = currentColor;
        tool.strokeStyle = pencilColor;
    });
});

pWidth.addEventListener("change", (e)=>{
    pencilWidth = pWidth.value;
    tool.lineWidth = pencilWidth;
});



// Erasor
eWidth.addEventListener("change", (e)=>{
    erasorWidth = eWidth.value;
    tool.lineWidth = erasorWidth;
});

erasor.addEventListener("click", (e)=>{
    if(openErasor){
        tool.strokeStyle = erasorColor;
        tool.lineWidth = erasorWidth;
    }
    else{
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth;
    }
});


// Download
download.addEventListener("click", (e)=>{
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
});




// Undo-Redo
redo.addEventListener("click", (e)=>{
    if(track < undoRedoTracker.length-1){
        track++;

        let imgObj = {
            trackValue: track,
            undoRedoTracker
        }
        undoRedoCanvas(imgObj);
    }
});

undo.addEventListener("click", (e)=>{
    if(track > 0){
        track--;

        let imgObj = {
            trackValue: track,
            undoRedoTracker
        }
        undoRedoCanvas(imgObj);
    }
});

function undoRedoCanvas(imgObj){
    let val = imgObj.trackValue;
    let arr = imgObj.undoRedoTracker;

    let url = arr[val];

    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img,0,0, canvas.width, canvas.height);
    }
}