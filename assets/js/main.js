// Most of these objects should be available everywhere
var locations
var player
var clock
var minigame
var doorway
var lock
var puzzle
var dialogue
var zoom
var inventory

//Wrap the construction in a ready function
$(window).on("load",function(){

    // Setup the modals so that whenever a modal is closed, if available it will reopen the modal underneath
    $('body').on('hidden.bs.modal', function () {
        if($('.modal.show').length > 0){
            $('body').addClass('modal-open');
        }
    });

    // Create the clock
    clock = new Clock

    // Create the inventory
    inventory = new Inventory

    //Run the location creator to instantiate locations
    locations = []
    for (i=0;i<locationsList.length;i++) {
        locations.push(new Location(i))
    }  

    //Run the location creator to instantiate locations
    player = new Player(1)

    // Create the opening dialogue
    var d1 = "Welcome adventurers! After months at sea, a mighty storm has wrecked your ship on the shores of a mysterious island."
    var d2 = "The locals welcome you, but will require payment for transport off the island. You are tasked with recovering an ancient artefact, but will need to solve a series of challenges."
    var d3 = "You will need to be quick as the boat will only wait until sunset at 8pm. You are advised to start your search at the caves on the beach. When you have the artefact, return to the village to exchange it for your place on the boat."

    // Put the dialogues into modals and nest the on click methods
    $('#dialogue-modal').find('.modal-title').text(d1)
    $('#dialogue-modal').find('.modal-footer').find('.btn').text('Next')
    $('#dialogue-modal').find('.modal-footer').find('.btn')
            // On click method to move to the next dialogue block
            .on("click",function(){
                    // Unbind the 'next' dialogue listener
                    $(this).off("click")
                    // Open a new dialogue
                    setTimeout(function(){
                        $('#dialogue-modal').find('.modal-title').text(d2)
                        $('#dialogue-modal').find('.modal-footer').find('.btn').text('Next')
                        $('#dialogue-modal').find('.modal-footer').find('.btn')
                            // On click method to move to the next dialogue block
                            .on("click",function(){
                                    // Unbind
                                    $(this).off("click")
                                    // Open a new dialogue
                                    setTimeout(function(){
                                        $('#dialogue-modal').find('.modal-title').text(d3)
                                        $('#dialogue-modal').find('.modal-footer').find('.btn').text('Begin!')
                                        $('#dialogue-modal').find('.modal-footer').find('.btn')
                                                    // On click method to start the timer and close the modal
                                                    .on("click",function(){
                                                        // Unbind the 'start timer' listener 
                                                        $(this).off("click")
                                                        // Tick the clock every second
                                                        setInterval(function(){clock.tick()},1000)
                                                        // Also, reset the 'continue' button to say continue instead of begin
                                                        $('#dialogue-modal').find('.modal-footer').find('.btn').text('Continue')
                                                        // Need to give them the key.
                                                        zoom = new Zoom('assets/images/locks/padlock-key.jpg','padlock-key',"You'll need this!",1)
                                                    })
                                        // Show the third modal
                                        $('#dialogue-modal').modal('show')
                                    // Short delay to keep open
                                    },500)
                            })
                        // Show the second modal
                        $('#dialogue-modal').modal('show')
                    // Delay to keep open
                    },500)
            })
    // Show the first modal
    $('#dialogue-modal').modal('show')
    
})


// Function to run when the player completes the game
function endGame(){

    // Get the current time on the clock
    var currentTime = clock.currentTime

    // Compare the current time to 8pm.
    var cutOff = new Date(2020,7,1,20,0,0,0) 
    if (currentTime <= cutOff) {
        console.log("Well done! You found the artefact in time")
    } else {
        console.log("Bad luck! You found the artefact but the boat has gone and you're stuck here forever")
    }



}

