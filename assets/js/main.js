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
var hint
var nextHint = 'travel_start_cave'
var clockTicks
var runningTravelTime = 0

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

    // Create the leaderboard
    leaderboard = new Leaderboard

    // Create a class for giving hints
    hint = new Hint

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
    var d3 = " When you have the artefact, return to the village to exchange it for your place on the boat. You will need to be quick as the boat will only wait until sunset at 8pm. You are advised to start your search at the caves on the beach."

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
                                                        clockTicks = setInterval(function(){clock.tick()},1000)
                                                        // Also, reset the 'continue' button to say continue instead of begin
                                                        $('#dialogue-modal').find('.modal-footer').find('.btn').text('Continue')
                                                        // Need to give them the key.
                                                        zoom = new Zoom('assets/images/locks/padlock-key.png','padlock-key',"You'll need this!",1)
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

    console.log("Game complete")

    // Stop the clock
    clearInterval(clockTicks)

    // Get the current time on the clock
    var currentTime = clock.currentTime             // Time on the stopped clock (date object I think)
    var startTime = new Date(2020,7,1,12,0,0,0)     // Time of start (also a date object)
    var eDate = new Date(currentTime - startTime)   // Might be unecessary
    var eTime = Math.round(eDate.getTime()/1000)    // Convert to seconds and round
    var eHours = eDate.getHours() - 1
    var eMins = eDate.getMinutes()
    var eSecs = eDate.getSeconds()

    // Compare the current time to 8pm.
    var cutOff = new Date(2020,7,1,20,0,0,0) 
    if (currentTime <= cutOff) {
        var endText = "Congratulations!" 
        var endText1 = "You found the artefact in time. The villagers will take you to back to the mainland. "
        var endText2 = "Your time was " + eHours + "h " + eMins + "m " + eSecs + "s."
    } else {
        var endText = "Bad luck!" 
        var endText1 = "You found the artefact but the boat has gone and you're stuck here forever... "
        var endText2 = "Your time was " + eHours + "h " + eMins + "m " + eSecs + "s."
    }
    var endText3 = "Please enter a team name:"

    // Put together a dialogue to show completion
    $('#dialogue-modal').find('.modal-title').text(endText)
    $('#dialogue-modal').find('.modal-title').append($('<span class="endText endText1">'+endText1+'</span>'))
                                            .append($('<span class="endText endText2">'+endText2+'</span>'))
                                            .append($('<span class="endText endText3">'+endText3+'</span>'))
                                            .append($('<span contenteditable="true" class="endText endText4"></span>'))
    $('#dialogue-modal').find('.modal-footer').find('.btn')
                .text('Submit Time')
                // On click method to show the leaderboard
                .on("click",function(){
                    $('#dialogue-modal').modal('hide')
                    $('#minigame-modal').modal('hide')

                    // Submit the time to the database (as a string)
                    var playerName = $('.endText4').text()
                    var travelTime = runningTravelTime                                                        // Which is in seconds
                    var puzzleTime = eTime - runningTravelTime                                                // Also in seconds
                    submitTime(playerName,Math.round(travelTime),Math.round(puzzleTime),Math.round(eTime))    // Everything in seconds

                })
    // Show the modal and focus on the text box
    $('#dialogue-modal').modal('show')
    $('.endText4').focus()

}

// Function to submit the finishing time and load the new leaderboard
function submitTime(playerName,travelTime,puzzleTime,totalTime) {

    // Calculate number of hints used
    var allHintsUsed = hint.hintList.filter(function(entry){
        return entry.hintGiven == 1
    })

    // Ajax call to submit the time
    $.ajax({
        type: "GET",
        url: "./php/submitTime.php?playerName="+playerName+"&travelTime="+travelTime+"&puzzleTime="+puzzleTime+"&totalTime="+totalTime+"&hintsGiven="+allHintsUsed.length,
        dataType:"json",
        success : function(data){
            console.log("Successfully submitted time")
            console.log(data)

            showLeaderboard()

        }

    });

}

