// List of information for the locks
var lockData = [{name:"Cave",
                    lock_img:"assets/images/locks/padlock.jpg",
                    lock_text:"Do you have a key?",
                    inter_img:"assets/images/locks/padlock_and_key.jpg",
                    opened_img:"assets/images/locks/opened_padlock.jpg"},
                    {name:"Waterfall",
                    lock_img:"assets/images/locks/stepping-stones-water.jpg",
                    lock_text:"Be careful! Some of those stones look slippery...",
                    opened_img:"assets/images/locks/stepping-stones-water.jpg"},
                    {name:"Well",
                    lock_img:"assets/images/locks/dial_lock.jpg",
                    lock_text:"The lock needs a combination.",
                    opened_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Volcano",
                    lock_img:"assets/images/locks/dial_lock.jpg",
                    lock_text:"The door is locked",
                    opened_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Obelisk",
                    lock_img:"assets/images/locks/dial_lock.jpg",
                    lock_text:"The door is locked",
                    opened_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Tree",
                    lock_img:"assets/images/locks/dial_lock.jpg",
                    lock_text:"The door is locked",
                    opened_img:"assets/images/locks/dial_lock.jpg"},
                    ]

// Class for a door lock
class Lock{

    // Constructor
    constructor(index){

        this.index = index
        this.lockPath = []

        // Fill and show the lock modal
        var lockModal = $('#lock-modal')
        lockModal.find('.modal-title').text(lockData[index].lock_text)  
        var lockModalBody = lockModal.find('.modal-body')   
                                    .empty()                                
                                    .append('<img class="img-fluid" id="lock-background" src='+lockData[index].lock_img+' alt="Minigame">')

        // Depending on the location, different click options are required for the locks (for now, assuming all are diallocks)
        switch(index) {
            // For the first task, the lock needs to know whether the key has been clicked on or not
            case 0:
                break;

            // The second task is stepping stones
            case 1:
                // Append a clickable div to each stepping stone
                for (var i = 0; i<10; i++) {
                    lockModalBody.append($('<div class="stepping-stone click-region" id="stepping-stone-'+i+'"></div>')
                                        .attr('data-stone-index',i)
                                        .append('<img class="img-fluid" id="stepping-stone-img-'+i+'" src=assets/images/locks/stepping-stones-stone.png alt="Stone">')
                                        .on("click",function(){
                                            $(this).animate({top:'+=6px'})
                                            $(this).animate({top:'-=6px'})
                                            lock.addToLockPath($(this).attr('data-stone-index'))
                                        })
                    )
                }
                // Add a check of the lock on click of the final stone
                $('#stepping-stone-9').on("click",function(){lock.checkCriteria()})
                break;

            // For the third task (the dial lock) various clickable bits need to be added
            case 2: 
                lockModalBody.append($('<img class="img-fluid" id="diallock-dial" src=assets/images/locks/dial_lock_dial.png alt="Dial">')
                                        .on("click",function(){rotateDial()})
                                    )
                            .append($('<img class="img-fluid diallock-arrow cw dir-selected" src=assets/images/locks/direction-clockwise.png alt="Arrow CW">')
                                        .on("click",function(){changeDirection("cw")})
                                    )
                            .append($('<img class="img-fluid diallock-arrow ccw dir-unselected" src=assets/images/locks/direction-clockwise.png alt="Arrow CCW">')
                                        .on("click",function(){changeDirection("ccw")})
                                    )
                break;
        }
        
        // Add a div to flash red or green on success or failure
        lockModalBody.append($('<div id="outlineflash"></div>'))

        // Hide the doorway modal
        $('#door-modal').modal('hide')

        // Last, display the lock
        setTimeout(function() {lockModal.modal('show')},500)  

    }

    // Function to reset the lock if you think you've messed it up
    resetLock() {

        switch(this.index) {
            case 0:
                break;
            case 1:
                // Reset the path to zero
                this.lockPath = []
                break;
            case 2:
                // Reset the path to zero, and change the rotation of the dial back to center
                this.lockPath = []
                $('#diallock-dial').css({"transform":"rotate(0deg)"})
                break;
        }

    }

    // This function contains the 'path' through the lock. This can be checked against the target path
    addToLockPath(step) {

        switch(this.index) {
            case 0:
                this.lockPath = ["Key"]
                break;
            case 1:
                this.lockPath.push(parseInt(step))
                console.log("Checking lock path")
                console.log(this.lockPath)
                break;
            case 2:
                // Push the step into the lock path
                this.lockPath.push(step)
                break;
        }

    }

    // Function to check whether the lock has been activated successfully
    checkCriteria() {

        console.log("Checking the lock")
        console.log(this.lockPath)

        // Get the target path for the current puzzle
        switch(this.index) {
            case 0:
                var targetLockPath = ['Key']
                break;
            case 1:
                var targetLockPath = [0,1,3,4,6,8,9]
                break;
            case 2: // cw18 acw10 cw29 acw25
                var targetLockPath = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,17,16,15,14,13,12,11,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,28,27,26,25]
                break;
        }

        // Check whether the lock path matches the correct target
        if (JSON.stringify(this.lockPath) == JSON.stringify(targetLockPath)) {
            var unlocked = 1
        } else {
            var unlocked = 0
        }

        // If the unlock was successful, move on to the puzzle page
        if (unlocked == 1) {

            // If it's the padlock that's been undone, remove the key from the inventory
            if (this.index == 0) {
                inventory.removeItem('padlock-key')
            }

            // Also need to update the doorway information to mark it as unlocked
            locations[this.index].locked = 0

            // Flash the lock green
            $('#outlineflash').animate({
                borderWidth:'4px',
                borderColor:'#31C110',
                boxShadow:'0px 0px 10px 10px #31C110'
            })

            // Hide the open lock modal and show the new minigame one
            setTimeout(function(i){
                $('#lock-modal').modal('hide');
                setTimeout(function(ind){
                    minigame = new Minigame(ind);
                },500,i)
            },1000,this.index)

        // If that wasn't a successful unlock attempt    
        } else {

            // Otherwise, flash the lock red and remain on the page
            $('#outlineflash').animate({
                borderWidth:'4px',
                borderColor:'#FF0000',
                boxShadow:'0px 0px 10px 10px #FF0000'
            })
            $('#outlineflash').animate({
                borderWidth:'4px',
                borderColor:'transparent',
                boxShadow:'0px 0px 0px 0px transparent'
            })
            
            // Reset the lock to allow you to try again
            this.resetLock()

        }

    }

}

// This is the on click function for 'test' on a lock
function checkLock() {

    // Run the check method from the lock class
    lock.checkCriteria()

}

// This is the on click function for 'reset' on a lock
function resetLock() {

    // Run the reset method from the lock class
    lock.resetLock()

}

// Function for rotating the dial of a dial lock
function rotateDial(){

    // Get which of the two arrows is selected to give you the direction
    var directionSelected = $('.diallock-arrow.dir-selected')
    if (directionSelected.hasClass("cw")) {
        direction = 1
    } else {
        direction = -1
    }

    // Selected the dial and get its current angle as a rotation matrix
    var dial = $('#diallock-dial')
    var currentAngles = dial.css("transform")

    // Break up the rotation matrix into pieces, and convert the pieces into a 2D angle
    var splitAngles = currentAngles.split('(')[1],
        splitAngles = splitAngles.split(')')[0],
        splitAngles = splitAngles.split(',')
    var currentAngle = Math.round(Math.atan2(splitAngles[1], splitAngles[0]) * (180/Math.PI));

    // Add 360/40 = 9 degrees and apply to the dial
    var newAngle = currentAngle + 9*direction
    if (newAngle < 0) {newAngle += 360}
    $('#diallock-dial').css({"transform":"rotate("+newAngle+"deg)"})

    // Get the current number and add it to the path
    lock.addToLockPath(40-(newAngle/9))
}

// Function to change direction selected
function changeDirection(dirclicked) {

    // Select both arrows
    var cw = $('.diallock-arrow.cw')
    var ccw = $('.diallock-arrow.ccw')

    // Update the selected and unselected classes on each (this is inelegant but simple)
    if (dirclicked == "cw") {
        cw.addClass("dir-selected")
        cw.removeClass("dir-unselected")
        ccw.removeClass("dir-selected")
        ccw.addClass("dir-unselected")
    } 
    if (dirclicked == "ccw") {
        cw.addClass("dir-unselected")
        cw.removeClass("dir-selected")
        ccw.removeClass("dir-unselected")
        ccw.addClass("dir-selected")
    }

}

