var smallJug
var bigJug
var scales

// Minigame for inside the waterfall
class WaterfallPuzzle{

    // Constructor
    constructor(index){

        // Select the modal body for content (and empty both of them)
        var canvas = $('#minigame-modal').find('.modal-body').empty()
        var title = $('#minigame-modal').find('.modal-title').empty()
        
        // Add the the background and the title
        canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        title.text("There are some empty water containers and a set of scales")

        // Add two water containers and the scales
        scales = new Scales()
        smallJug = new Jug(3)
        bigJug = new Jug(5)
        
        // If the puzzle has been completed, show the opened hiding place
        if (locations[index].complete == 1) {
            this.openHidingPlace()
        }

        // Show the modal
        $('#minigame-modal').modal('show')

    }

    // This method replaces the background with one with an open hiding space
    openHidingPlace(){

        // Replace the background image with the door opened image
        $('#scales').remove()
        $('#minigame-modal').find('.modal-body')                                
            .append('<img class="img-fluid" id="scales" src=assets/images/minigames/puzzles/waterfall/scales-opened.bmp alt="Scales">')
            .append('<img class="img-fluid" id="scales-pointer" src=assets/images/minigames/puzzles/waterfall/scales-pointer.png alt="scales">')

        // Add the two clues to the image
        var clue1 = $('<img class="img-fluid" id="well-stones-clue" src=assets/images/minigames/puzzles/waterfall/well-stones-clue.png alt="Clue1">')
                   .on("click",function(){zoom = new Zoom('assets/images/minigames/puzzles/waterfall/well-stones-clue.png','well-stones-clue','This must be some sort of hint',1)})
        var clue2 = $('<img class="img-fluid" id="well-clue" src=assets/images/minigames/puzzles/waterfall/well-clue.bmp alt="Clue2">')
                   .on("click",function(){zoom = new Zoom('assets/images/minigames/puzzles/waterfall/well-clue.bmp','well-clue','This must be a clue to the next location',1)})
        $('#minigame-modal').find('.modal-body').append(clue1).append(clue2)

    }

}

// Class for a water jug (should know how to fill and empty itself from the various sources)
class Jug{

    // Constructor (input is the capacity of the jug)
    constructor(capacity){

        // Initialised with its capacity, and empty (all measurements in liters)
        this.name = capacity + "L"
        this.capacity = capacity
        this.contents = 0
        this.space = this.capacity - this.contents
        this.labels = 0
        var self = this

        // Set the div height for the water when full
        if (capacity == 3) {this.maxWaterHeight = 5} else {this.maxWaterHeight = 7}

        // Add the image for the jug
        var canvas = $('#minigame-modal').find('.modal-body')
                    .append(
                        $('<img class="img-fluid click-region jug jug-capacity-'+capacity+'" src=assets/images/minigames/puzzles/waterfall/jug.bmp alt="Jug">')
                            .on("click",function(){self.showActions()})
                    )
       
        // Add a blue rectangle to be the contents of the jug
        canvas.append($('<div class="jug-contents jug-capacity-'+capacity+'"></div>'))

        // Add labels above the jug for doing actions to the jug 
        canvas
            .append($('<img class="img-fluid click-region jug-action jug-action-fill jug-capacity-'+capacity+'" src=assets/images/minigames/puzzles/waterfall/scroll-fill.bmp alt="Scroll">')
                        .on("click",function(){self.fill()})
            )
            .append($('<img class="img-fluid click-region jug-action jug-action-pour jug-capacity-'+capacity+'" src=assets/images/minigames/puzzles/waterfall/scroll-pour.bmp alt="Scroll">')
                        .on("click",function(){self.pour()})
            )
            .append($('<img class="img-fluid click-region jug-action jug-action-empty jug-capacity-'+capacity+'" src=assets/images/minigames/puzzles/waterfall/scroll-empty.bmp alt="Scroll">')
                        .on("click",function(){self.empty()})
            )
            .append($('<img class="img-fluid click-region jug-action jug-action-weigh jug-capacity-'+capacity+'" src=assets/images/minigames/puzzles/waterfall/scroll-weigh.bmp alt="Scroll">')
                        .on("click",function(){self.putOnScales()})
            )
    
    }

    // Method to show the labels when the jug is clicked
    showActions(){
        // If the actions (labels) are hidden
        if (this.labels == 0) {
            // Unmark them as hidden
            this.labels = 1
            // Mark the other jug's actions as hidden
            if (this.capacity == 3) {bigJug.labels = 0} else {smallJug.labels = 0}
            // Hide and display the actions
            $('.jug-action.jug-capacity-'+this.capacity).css({"display":"block"})
            $('.jug-action.jug-capacity-'+(8-this.capacity)).css({"display":"none"})
        // If the actions are already visible for this jug
        } else {
            // Mark them as hidden
            this.labels = 0
            // Mark the other jug's as visible
            if (this.capacity == 3) {bigJug.labels = 1} else {smallJug.labels = 1}
            // Hide and display the actions
            $('.jug-action.jug-capacity-'+this.capacity).css({"display":"none"})
            $('.jug-action.jug-capacity-'+(8-this.capacity)).css({"display":"block"})
        }
    }

    // Method to fill the jug from the waterfall
    fill(){
        console.log("Filling the jug")
        this.contents = this.capacity
        this.space = 0
        this.updateJugs()
    }

    // Method to empty the jug to the ground
    empty(){
        console.log("Emptying the jug")
        this.contents = 0
        this.space = this.capacity
        this.updateJugs()
    }

    // Method to pour jug into other jug
    pour(){
        console.log("Pouring the jug into the other one")
        if (this.name == "3L") {
            var pourer = smallJug
            var pouree = bigJug
        } else {
            var pourer = bigJug
            var pouree = smallJug
        }
        // If there's space, pour the whole contents
        if (pourer.contents <= pouree.space) {
            console.log("There was space for everything")
            // Add to the pouree
            pouree.contents = pouree.contents + pourer.contents
            pouree.space = pouree.capacity - pouree.contents
            // Empty the pourer
            pourer.contents = 0
            pourer.space = pourer.capacity
        } else {
            console.log("There wasn't enough space")
            var overflow = pourer.contents - pouree.space
            // Empty as much as you can
            pourer.contents = overflow 
            pourer.space = pourer.capacity - pourer.contents
            // Fill the other jug as much as possible
            pouree.contents = pouree.capacity
            pouree.space = 0
        }
        this.updateJugs()
    }

    // Method to weigh the jug
    weigh(){
        scales.setWeight(this.contents)
    }

    // Method to update the graphic of the jug with its contents
    updateJugs(){
        console.log("Updating the jugs")

        // Calculate the water height as a %
        var smallPercentFull = smallJug.contents / smallJug.capacity
        var bigPercentFull = bigJug.contents / bigJug.capacity
        var smallWaterHeight = smallJug.maxWaterHeight * smallPercentFull
        var bigWaterHeight = bigJug.maxWaterHeight * bigPercentFull

        // Animate the water with the new height
        $('.jug-contents.jug-capacity-3').animate({
            height:smallWaterHeight+'%'
        })
        $('.jug-contents.jug-capacity-5').animate({
            height:bigWaterHeight+'%'
        })

    }

    // Method for moving the jug over to the scales
    putOnScales(){

        console.log("Putting the "+this.capacity+"kg jug on the scales")
        var self = this

        // Set new position of the jug and its contents
        $('.jug.jug-capacity-'+this.capacity).animate({
            "top":"38%",
            "left":"51%"
        })
        $('.jug-contents.jug-capacity-'+this.capacity).animate({
            "bottom":"53.75%",
            "left":"53%"
        })

        // Once the jug is on the scales, call weigh jug
        self.weigh()

        // Leave it 2 seconds then remove it
        setTimeout(function(){self.takeOffScales()},2000)

    }

    // Method for moving the jug off the scales
    takeOffScales(){

        console.log("Removing the "+this.capacity+"kg jug from the scales")

        if (this.capacity == 3) {
            // Set new position of the 3kg jug and its contents
            $('.jug.jug-capacity-'+this.capacity).animate({
                "top":"50%",
                "left":"25%"
            })
            $('.jug-contents.jug-capacity-'+this.capacity).animate({
                "bottom":"41.75%",
                "left":"27%"
            })
        } else {
            // Set new position of the 5kg jug and its contents
            $('.jug.jug-capacity-'+this.capacity).animate({
                "top":"50%",
                "left":"75%"
            })
            $('.jug-contents.jug-capacity-'+this.capacity).animate({
                "bottom":"41.75%",
                "left":"77%"
            })            
        }

        // Once the jug is off the scales, set the scales to 0
        scales.setWeight(0)
    }

}

// Class for the scales (should know how to update the image depending on what's on the scales)
class Scales{

    // Constructor
    constructor(){

        this.angles = ['-180deg','-135deg','-90deg','-45deg','0deg','45deg','90deg','135deg']
        var self = this
        console.log(self.angles)

        // Select the canvas and add the scales and pointer to it
        var canvas = $('#minigame-modal').find('.modal-body')
                    .append($('<img class="img-fluid" id="scales" src=assets/images/minigames/puzzles/waterfall/scales.bmp alt="Scales">'))
                    .append($('<img class="img-fluid" id="scales-pointer" src=assets/images/minigames/puzzles/waterfall/scales-pointer.png alt="scales">'))
    
    }

    // Weighing a jug will pass its weight to the scales as a parameter
    setWeight(weight){

        console.log("Setting the scales pointer to " + weight + "kg")
        console.log(scales.angles[weight])

        // Set the rotation angle of the pointer to the right angle
        $('#scales-pointer').css({'transform':'rotate('+scales.angles[weight]+')'})

        // If 4kg was placed on the scales, mark the puzzle as complete, and open the hiding place
        if (weight == 4) {
            console.log("Weighing successful")
            // Mark puzzle as complete
            locations.find(function(entry){return entry.name=="Waterfall"}).complete = 1

            // Set a timeout so that the scales can be seen moving
            setTimeout(function(){
                // Show a dialogue modal, describing the entry opening
                $('#dialogue-modal').find('.modal-title').text('A hidden compartment in the bottom of the scales opens...')
                $('#dialogue-modal').modal('show')
                // Show the updated background and clues
                puzzle.openHidingPlace()
            },2000)
        }

    }

}