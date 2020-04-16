// List of information about the doorways
// List of locations and the player should be available everywhere
var doorwayData = [{name:"WindowInTheRock",     lockposition:["25%","25%"], locksize:["10%","10%"],
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Waterfall",          lockposition:["25%","25%"], locksize:["10%","10%"],
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Volcano",            lockposition:["25%","25%"], locksize:["10%","10%"],
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Obelisk",            lockposition:["25%","25%"], locksize:["10%","10%"],
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Tree",               lockposition:["25%","25%"], locksize:["10%","10%"],
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    ]

// Class for the locked door that blocks the minigame
class Doorway{

    // Constructor
    constructor(index){

        console.log("Constructing doorway: " + index)

        this.lockPosition = doorwayData[index].lockposition
        this.lockSize = doorwayData[index].locksize
        this.lockImg = doorwayData[index].lock_img

        // The first thing to do is check wether the door is locked (if not, bypass it)
        if (locations[index].locked == 1) {

            // Fill in the doorway modal and show  
            var doorwayModal = $('#door-modal')

            // Add a title/description
            doorwayModal.find('.modal-title').text("You see a locked door")  

            // Empty the current content
            doorwayModal.find('.modal-body')   
                .empty()     
                
                // Add the background image
                .append('<img class="img-fluid" id="doorway-background" src='+locations[index].doorway_img+' alt="Doorway">')
            
                // Add a lock div to be clicked on
                .append($('<img class="img-fluid" id="doorway-lock" src='+this.lockImg+' alt="Lock">')
                                    .css({"top":this.lockPosition[0]})
                                    .css({"left":this.lockPosition[1]})
                                    .css({"width":this.lockSize[0]})
                                    .on("click",function(){
                                        createLock(index)
                                    })
                )

            // Show the modal
            doorwayModal.modal('show')   

        } else {

            // Skip straight to creating the minigame modal
            minigame = new Minigame(index)

        }

    }

}

// Function to create 
function createLock(index){

    // Create lock instance
    lock = new Lock(index)

}
