// List of locations should be available everywhere
var locationsList = [{name:"Cave", position:["25%","42%"],id:0,locked:0,complete:1,
                    doorway_img:"assets/images/doorways/cave.png",
                    minigame_img:"assets/images/minigames/cave.png",
                    completed_img:"assets/images/minigames/cave_opened.png"},
                    {name:"Waterfall",   position:["52%","55%"],id:1,locked:0,complete:1,
                    doorway_img:"assets/images/doorways/waterfall.png",
                    minigame_img:"assets/images/minigames/waterfall.jpg",
                    completed_img:"assets/images/minigames/waterfall.jpg"},
                    {name:"Well",        position:["64%","41%"],id:2,locked:0,complete:0,
                    doorway_img:"assets/images/doorways/well.png",
                    minigame_img:"assets/images/minigames/well2.jpg",
                    completed_img:"assets/images/minigames/well.jpg"},
                    {name:"Obelisk",     position:["19%","52%"],id:3,locked:0,complete:[0,0],
                    doorway_img:"assets/images/doorways/obelisk.jfif",
                    minigame_img:"assets/images/minigames/obelisk.jfif",
                    completed_img:"assets/images/minigames/obelisk.jfif"},
                    {name:"Volcano",          position:["37%","67%"],id:4,locked:0,complete:0,
                    doorway_img:"assets/images/doorways/volcano.jpg",
                    minigame_img:"assets/images/minigames/volcano.jpg",
                    completed_img:"assets/images/minigames/volcano.jpg"},
                    {name:"Skeleton",             position:["63%","79%"],id:5,locked:0,complete:0,
                    doorway_img:"assets/images/doorways/skeleton.jpg",
                    minigame_img:"assets/images/minigames/skeleton.jpg",
                    completed_img:"assets/images/minigames/skeleton.jpg"},
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

        // Send the player token to the location
        player.goToLocation(index)

        // Add time to the clock
        clock.addTravelTime(60)

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