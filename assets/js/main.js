// List of locations and the player should be available everywhere
var locationsList = [{name:"Camp",position:["50%","69%"]},
                    {name:"Port du Moulin",position:["38%","55%"]},
                    {name:"Clos de Menage",position:["47%","72%"]},
                    {name:"Port Gorey",position:["80%","10%"]},
                    {name:"Creux Harbour",position:["66%","85%"]},
                    ]
var locations
var player

// Every location on the island has a class
// The class needs its coordinates, some name and description, and probably some onclick functions?
class Location {

    // Create locations
    constructor(index){

        // Add name and position to the object
        this.id = index
        this.name = locationsList[index].name
        this.position = locationsList[index].position

        // Create and append location objects
        $('#background-map-wrapper').append($('<div class="location-marker"></div>')
                                            .css({"position":"absolute"})
                                            .css({"top":this.position[0]})
                                            .css({"left":this.position[1]})
                                            .attr('name',this.name)
                                            .attr('index',this.id)
                                            .on("click",function(){locationClicked(index)})
                                            .append($('<p class="x-text">x</p>'))        
                                            )

    }

}

// Create a class for the 'player'
class Player {

    // Create locations
    constructor(index){

        // Add name and position to the object
        this.id = index
        this.name = locationsList[index].name
        this.position = locationsList[index].position

        // Create and append location objects
        $('#background-map-wrapper').append($('<div class="player-token"></div>')
                                            .css({"position":"absolute"})
                                            .css({"top":"40%"})
                                            .css({"left":"40%"})
                                            .attr('name',"Player")    
                                            .append($('<img id="player-token-img" src="assets/images/token.png" alt="Token">'))  
                                            )

    }

    // Move the player around
    goToLocation(index) {

        console.log("Going to location")
        console.log(locationsList)
        console.log(index)
        console.log(locationsList[index])
        console.log(locationsList[index].position)

        // Get the position of the location
        var newPos = locationsList[index].position
        console.log(newPos)

        // Update the player's position to that position
        $('.player-token').css({"top":newPos[0]})
                        .css({"left":newPos[1]})

    }

}

//Wrap the construction in a ready function
$(function(){

    //Run the location creator to instantiate locations
    locations = []
    for (i=0;i<locationsList.length;i++) {
        locations.push(new Location(i))
    }  

    //Run the location creator to instantiate locations
    player = new Player(1)

})


function locationClicked(index) {

    player.goToLocation(index)

}