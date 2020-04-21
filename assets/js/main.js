// Most of these objects should be available everywhere
var locations
var player
var clock
var minigame
var doorway
var lock
var puzzle

//Wrap the construction in a ready function
$(window).on("load",function(){

  // Create the clock
  clock = new Clock

  //Run the location creator to instantiate locations
  locations = []
  for (i=0;i<locationsList.length;i++) {
      locations.push(new Location(i))
  }  

  //Run the location creator to instantiate locations
  player = new Player(1)

})

function elementClicked(elmnt) {
  elmnt.onmousedown = printName
  function printName(e){
    e = e || window.event
    e.preventDefault()
    console.log("This elenent was clicked")
  }
}

// This function allows elements to be dragged (needs to be applied to draggable elements using: "dragElement($(el))")
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}