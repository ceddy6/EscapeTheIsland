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

        // Get the position of the location
        var newPos = locationsList[index].position

        // Add an offset to keep the player piece from getting in the way of the location
        var t = newPos[0].slice(0,2)
        var l = newPos[1].slice(0,2)
        t = parseInt(t) + 2
        l = parseInt(l) + 2

        // Update the player's position to that position
        $('.player-token').css({"top":t+"%"})
                        .css({"left":l+"%"})

        // Update the players index and name
        this.id = index
        this.name = locationsList[index].name
        this.position = newPos

    }

}