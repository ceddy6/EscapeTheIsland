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