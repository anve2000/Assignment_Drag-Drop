const dropzones = document.getElementsByClassName("dropzone");
const undo = document.getElementsByClassName("undo")[0];
const message = document.getElementsByClassName("message")[0];
const draggables = document.getElementsByClassName("draggable");
const body = document.getElementsByTagName('body')[0];

let source="";
let lastStateDropped = "",lastStateReplaced = "";

for (let i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener("drag", (e) => {
    e.target.classList.add("dragged");
  });

  draggables[i].addEventListener("dragstart", (e) => {
    source = e.target;
    lastStateDropped='';
    lastStateReplaced='';
  });

  draggables[i].addEventListener("dragover", (e) => {
    e.target.classList.add("dragover");
  });

  draggables[i].addEventListener("dragend", (e) => {
    e.target.classList.remove("dragged");
  });
}


let current;
for (let i = 0; i < dropzones.length; i++) {
  dropzones[i].addEventListener("dragenter", (e) => {
    e.target.classList.add("dragenter");

    let sourcePar = source.parentElement;
    current = e.target;
    let currPar = current.parentElement;

    if(current.classList.contains('dropzone')===false)
    {
       return;
    }

    if (current === source){ 
      return;
    };
    
    currPar.removeChild(current);
    sourcePar.removeChild(source);
    sourcePar.append(current);
    currPar.append(source);
    lastStateDropped = source;
    lastStateReplaced = current;
  });

  
  dropzones[i].addEventListener("dragover", (e) => {
    e.preventDefault();
    e.target.classList.add("dragover");
  });

  dropzones[i].addEventListener("dragleave", (e) => {
    e.target.classList.remove("dragover", "dragenter");
    if( lastStateDropped==='' || lastStateReplaced==='' || lastStateDropped===lastStateReplaced)return;
    let val_1 = lastStateDropped.innerText;
    let val_2 = lastStateReplaced.innerText;
    message.innerText = `[${val_1}]  <--->   [${val_2}]`;
    message.style.opacity = 1;
    setTimeout(() => {
      message.style.opacity = 0;
    }, 500);
    
  });

  dropzones[i].addEventListener("drop", (e) => {
    e.target.classList.remove("dragover", "dragenter");
  });
}

undo.addEventListener("click", (e) => {
  if (lastStateDropped === "" || lastStateReplaced === "") {
    message.innerText = "no box displaced yet....";
    message.style.opacity = 1;

    setTimeout(() => {
      message.innerText = "";
      message.style.opacity = 0;
    }, 1000);

    return;
  }

  lastStateDropped.classList.add("tar1");
  lastStateReplaced.classList.add("tar2");

  let lastStateDropped_parent = lastStateDropped.parentElement;
  let lastStateReplaced_parent = lastStateReplaced.parentElement;

  lastStateDropped_parent.removeChild(lastStateDropped);
  lastStateReplaced_parent.append(lastStateDropped);
  lastStateDropped_parent.append(lastStateReplaced);

  let val_1 = lastStateDropped.innerText;
  let val_2 = lastStateReplaced.innerText;

  message.innerText = `[${val_1}] <--->  [${val_2}]`;
  message.style.opacity = 1;

  setTimeout(() => {
    message.style.opacity = 0;
  }, 300);

  setTimeout(() => {
    lastStateDropped.classList.remove("tar2");
  }, 500);

  setTimeout(() => {
    lastStateReplaced.classList.remove("tar1");
  }, 300);

  let temp=lastStateDropped;
  lastStateDropped=lastStateReplaced;
  lastStateReplaced=temp;
});
