// Most of these objects should be available everywhere
var locations
var player
var clock
var minigame
var doorway
var lock
var zoom

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

// On click function to show the inventory
function showInventory(origin) {

  // Hide the modal that you came from if necessary
  if (origin) {
    $('#'+origin).modal('hide')
  }

  // Show the inventory modal
  $('#inventory-modal').modal('show')

  // Add an attribute, to provide the origin so we can reopen the lower modal
  $('#inventory-modal').attr('origin',origin)

}

// Need a function to handle clicks on items in the inventory
function inventoryItemClicked(item) {

  // Close the inventory modal
  $('#inventory-modal').modal('hide')

  // Reopen whatever modal it came from
  var modalOrigin = $('#inventory-modal').attr('origin')
  $('#'+modalOrigin).modal('show')

  switch(item) {

    case 'padlock-key':
      console.log("Key clicked on")
      break;

  }


}







// // Make the DIV element draggable:
// dragElement(document.getElementById("minigame1-stone1"));
// dragElement(document.getElementById("minigame1-stone2"));
// dragElement(document.getElementById("minigame1-stone3"));
// dragElement(document.getElementById("minigame1-stone4"));


// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }