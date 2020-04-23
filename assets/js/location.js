// List of locations should be available everywhere
var locationsList = [{name:"Cave", position:["25%","42%"],id:0,locked:0,complete:1,
                    doorway_img:"assets/images/doorways/cave.png",
                    minigame_img:"assets/images/minigames/cave.png",
                    completed_img:"assets/images/minigames/cave_opened.png"},
                    {name:"Waterfall",        position:["52%","55%"],id:1,locked:1,complete:0,
                    doorway_img:"assets/images/doorways/waterfall.jpg",
                    minigame_img:"assets/images/minigames/waterfall.jpg",
                    completed_img:"assets/images/minigames/waterfall.jpg"},
                    {name:"Well",        position:["64%","41%"],id:1,locked:1,complete:0,
                    doorway_img:"assets/images/doorways/well.png",
                    minigame_img:"assets/images/minigames/well.jpg",
                    completed_img:"assets/images/minigames/well.jpg"},
                    {name:"Volcano",          position:["47%","72%"],id:2,locked:1,complete:0,
                    doorway_img:"assets/images/doorways/volcano.jpg",
                    minigame_img:"assets/images/minigames/volcano.jpg",
                    completed_img:"assets/images/minigames/volcano.jpg"},
                    {name:"Obelisk",          position:["80%","10%"],id:3,locked:1,complete:0,
                    doorway_img:"assets/images/doorways/obelisk.jfif",
                    minigame_img:"assets/images/minigames/obelisk.jfif",
                    completed_img:"assets/images/minigames/obelisk.jfif"},
                    {name:"Tree",             position:["66%","85%"],id:4,locked:1,complete:0,
                    doorway_img:"assets/images/doorways/tree.jpg",
                    minigame_img:"assets/images/minigames/tree.jpg",
                    completed_img:"assets/images/minigames/tree.jpg"},
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

    // Send the player token to the location
    player.goToLocation(index)

    // Create and show the doorway modal
    doorway = new Doorway(index)

}