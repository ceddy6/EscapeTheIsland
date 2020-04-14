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