let optionsCont = document.querySelector(".option-cont");
let toolCont = document.querySelector(".tool-cont");
let pencilCont = document.querySelector(".pencil-cont");
let erasorCont  = document.querySelector(".erasor-tool-cont");
let stickyNotes = document.querySelector(".sticky-notes");
let upload = document.querySelector(".upload");

let openOptionCont = false;

let pencil = document.querySelector(".pencil");
let erasor = document.querySelector(".erasor");
let openPencil = false;
let openErasor = false;


optionsCont.addEventListener("click", (e)=>{
    openOptionCont = !openOptionCont;

    let icon = document.querySelector(".fas ");
    if(openOptionCont){
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        toolCont.style.display = "none";
        pencilCont.style.display = "none"
        erasorCont.style.display = "none"

        openPencil = false;
        openErasor = false;
    }
    else{
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
        toolCont.style.display = "flex"
    }
})


pencil.addEventListener("click", (e)=>{
    openPencil = !openPencil;
    if(openPencil){
        pencilCont.style.display = "block";
    }
    else{
        pencilCont.style.display = "none";
    }
});

erasor.addEventListener("click", (e)=>{
    openErasor = !openErasor;
    if(openErasor){
        erasorCont.style.display = "flex";
    }
    else{
        erasorCont.style.display = "none";
    }
});


upload.addEventListener("click", (e)=>{
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let  stickyTemplate = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="notes">
            <img  src="${url}" />
        </div>
        `;

        createStickyTemplate(stickyTemplate);
    })
});


stickyNotes.addEventListener("click", (e)=>{

   let  stickyTemplate = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="notes">
        <textarea spellcheck="false" placeholder="What is in your mind..." ></textarea>
    </div>
    `;
    createStickyTemplate(stickyTemplate);
});


function createStickyTemplate(stickyTemplate){
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");

    stickyCont.innerHTML = stickyTemplate;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);


    stickyCont.onmousedown = function(event) {
      dragAndDrop(stickyCont,event)
    };
      
    stickyCont.ondragstart = function() {
        return false;
    };
}


function noteActions(minimize, remove, stickyCont){
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    });
    minimize.addEventListener("click",(e)=>{
        let notes = stickyCont.querySelector(".notes");
        let notesDisplay = getComputedStyle(notes).getPropertyValue("display");

        if(notesDisplay === "none"){
            notes.style.display = "block";
        }
        else{
            notes.style.display = "none";
        }
    })
}


function dragAndDrop(sticky, event){
    let shiftX = event.clientX - sticky.getBoundingClientRect().left;
    let shiftY = event.clientY - sticky.getBoundingClientRect().top;
  
    sticky.style.position = 'absolute';
    sticky.style.zIndex = 1000;
    // document.body.append(sticky);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      sticky.style.left = pageX - shiftX + 'px';
      sticky.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    sticky.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      sticky.onmouseup = null;
    };
}