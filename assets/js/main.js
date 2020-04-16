// List of locations and the player should be available everywhere
var locationsList = [{name:"WindowInTheRock", position:["50%","69%"],id:0,locked:1,
                    doorway_img:"assets/images/doorways/windowintherock.jpg",
                    minigame_img:"assets/images/minigames/windowintherock.jpg"},
                    {name:"Waterfall",        position:["38%","55%"],id:1,locked:0,
                    doorway_img:"assets/images/doorways/waterfall.jpg",
                    minigame_img:"assets/images/minigames/waterfall.jpg"},
                    {name:"Volcano",          position:["47%","72%"],id:2,locked:1,
                    doorway_img:"assets/images/doorways/volcano.jpg",
                    minigame_img:"assets/images/minigames/volcano.jpg"},
                    {name:"Obelisk",          position:["80%","10%"],id:3,locked:0,
                    doorway_img:"assets/images/doorways/obelisk.jfif",
                    minigame_img:"assets/images/minigames/obelisk.jfif"},
                    {name:"Tree",             position:["66%","85%"],id:4,locked:1,
                    doorway_img:"assets/images/doorways/tree.jpg",
                    minigame_img:"assets/images/minigames/tree.jpg"},
                    ]
var locations
var player
var clock

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