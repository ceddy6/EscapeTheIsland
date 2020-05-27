// List of locations should be available everywhere
var locationsList = [{name:"Cave", position:["25%","42%"],width:5,height:5,id:0,locked:1,complete:0,
                        doorway_img:"assets/images/doorways/cave.png",
                        minigame_img:"assets/images/minigames/cave.png",
                        completed_img:"assets/images/minigames/cave_opened.png"},
                    {name:"Waterfall",   position:["52%","55%"],width:5,height:5,id:1,locked:1,complete:0,
                        doorway_img:"assets/images/doorways/waterfall.png",
                        minigame_img:"assets/images/minigames/waterfall.jpg",
                        completed_img:"assets/images/minigames/waterfall.jpg"},
                    {name:"Well",        position:["63%","40.5%"],width:5,height:6,id:2,locked:0,complete:0,
                        doorway_img:"assets/images/doorways/well.png",
                        minigame_img:"assets/images/minigames/well2.jpg",
                        completed_img:"assets/images/minigames/well.jpg"},
                    {name:"Obelisk",     position:["17%","52%"],width:5,height:9,id:3,locked:0,complete:[0,0],
                        doorway_img:"assets/images/doorways/obelisk.jpg",
                        minigame_img:"assets/images/minigames/obelisk.jpg",
                        completed_img:"assets/images/minigames/obelisk.jpg"},
                    {name:"Volcano",          position:["37%","67%"],width:5,height:5,id:4,locked:0,complete:0,
                        doorway_img:"assets/images/doorways/volcano.jpg",
                        minigame_img:"assets/images/minigames/volcano.jpg!d",
                        completed_img:"assets/images/minigames/volcano.jpg!d"},
                    {name:"Skeleton",             position:["63%","79%"],width:10,height:5,id:5,locked:0,complete:0,
                        doorway_img:"assets/images/doorways/skeleton.jpg",
                        minigame_img:"assets/images/minigames/skeleton.jpg",
                        completed_img:"assets/images/minigames/skeleton.jpg"},
                    {name:"Village",             position:["57%","28%"],width:13,height:12,id:6,locked:0,complete:0,
                        doorway_img:"assets/images/minigames/village.jpg",
                        minigame_img:"assets/images/minigames/village.jpg",
                        completed_img:"assets/images/minigames/village.jpg"},
                    {name:"Battle Site",    position:["83%","20%"],width:5,height:5,id:7,locked:0,
                        minigame_img:'assets/images/minigames/battle-site.jpg'},
                    {name:"Totems",         position:["40%","45%"],width:7,height:8,id:8,locked:0,
                        minigame_img:'assets/images/minigames/totems.jpg'},
                    {name:"Watchtower",     position:["59%","14%"],width:5,height:8,id:9,locked:0,
                        minigame_img:'assets/images/minigames/watchtower.jpeg'},
                    {name:"Shipwreck",      position:["34%","23%"],width:9,height:10,id:10,locked:0,
                        minigame_img:'assets/images/minigames/shipwreck.jpg'},
                    {name:"Ruins",          position:["74%","29%"],width:6,height:7,id:11,locked:0,
                        minigame_img:'assets/images/minigames/ruins.jpg'},
                    {name:"Tree",           position:["84%","42%"],width:11,height:11,id:12,locked:0,
                        minigame_img:'assets/images/minigames/tree.jpg'},
                    {name:"Crystal",        position:["85%","64%"],width:5,height:5,id:13,locked:0,
                        minigame_img:'assets/images/minigames/crystals.jpg'},
                    {name:"Camp",           position:["76%","53%"],width:8,height:9,id:14,locked:0,
                        minigame_img:'assets/images/minigames/camp.jpg'},
                    {name:"Sky Rocks",      position:["54%","66%"],width:7,height:7,id:15,locked:0,
                        minigame_img:'assets/images/minigames/sky-rocks.jpg'},
                    {name:"Temple",         position:["44%","80%"],width:5,height:5,id:16,locked:0,
                        minigame_img:'assets/images/minigames/temple.jpg'},
                    {name:"Dragons Lair",   position:["29%","79%"],width:10,height:11,id:17,locked:0,
                        minigame_img:'assets/images/minigames/dragons-lair.jpg'},
                    {name:"Oasis",          position:["72%","68%"],width:6,height:7,id:18,locked:0,
                        minigame_img:'assets/images/minigames/oasis.jpg'},
                    {name:"Whirlpool",      position:["94%","68%"],width:8,height:8,id:19,locked:0,
                        minigame_img:'assets/images/minigames/whirlpool.jpg'},
                    {name:"Giant Squid",    position:["93%","23%"],width:8,height:8,id:20,locked:0,
                        minigame_img:'assets/images/minigames/kraken.jpg'},
                    {name:"Poison Grove",    position:["17%","68%"],width:5,height:7,id:21,locked:0,
                        minigame_img:'assets/images/minigames/poison-grove.jpg'}
                    ]

// Every location on the island has a class
// The class needs its coordinates, some name and description, and probably some onclick functions?
class Location {

    // Create locations
    constructor(index){

        // Add name and position to the object
        this.id = index
        this.name = locationsList[index].name
        this.position = locationsList[index].position
        this.width = locationsList[index].width
        this.height = locationsList[index].height
        this.locked = locationsList[index].locked
        this.complete = locationsList[index].complete
        this.doorway_img = locationsList[index].doorway_img
        this.minigame_img = locationsList[index].minigame_img
        this.completed_img = locationsList[index].completed_img

        // Create and append location objects
        $('#background-map-wrapper').append($('<div class="location-marker click-region"></div>')
                                            .css({"position":"absolute"})
                                            .css({"top":this.position[0]})
                                            .css({"left":this.position[1]})
                                            .css({"width":this.width+'%'})
                                            .css({"height":this.height+'%'})
                                            .attr('name',this.name)
                                            .attr('index',this.id)
                                            .on("click",function(){locationClicked(index)})
                                            //.append($('<p class="x-text">x</p>'))        
                                            )

    }

    // Function to mark a location as unlocked
    unlock() {
        this.locked = 0
    }

}

// When a location is clicked on
function locationClicked(index) {

    console.log(player.id)
    console.log(index)

    // If the player isn't already at the location, send it there and open the doorway on arrival
    if (player.id != index) {

        // Calculate the travel time
        var currLoc = player.position
        var newLoc = locationsList[index].position
        var travelTime = calculateTravelTime(currLoc,newLoc)

        // Send the player token to the location
        player.goToLocation(index)

        // Add time to the clock
        clock.addTravelTime(travelTime)

        // Delay opening the modal to show the travel
        setTimeout(function(){

            // Create and show the doorway modal
            doorway = new Doorway(index)

        },2000)
        
    } else {

        // If the player is already there, open the doorway straight away
        doorway = new Doorway(index)

    }

}

// Function to take two positions and calculate the travel time between them
function calculateTravelTime(currLoc,newLoc){

    // Slice up the locations into coordinates
    var currX = parseInt(currLoc[0].slice(0,-1))
    var currY = parseInt(currLoc[1].slice(0,-1))
    var newX = parseInt(newLoc[0].slice(0,-1))
    var newY = parseInt(newLoc[1].slice(0,-1))

    // Calculate the distance between them
    var xOffset = currX - newX
    var yOffset = currY - newY
    var dist = Math.sqrt(xOffset*xOffset + yOffset*yOffset)

    // Multiply by speed to give a time
    var speed = 1.85
    var time = dist*speed

    return time

}