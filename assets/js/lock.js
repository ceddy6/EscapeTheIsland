// List of information for the locks
var lockData = [{name:"WindowInTheRock",
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Waterfall",
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Volcano",
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Obelisk",
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    {name:"Tree",
                    lock_img:"assets/images/locks/dial_lock.jpg"},
                    ]

// Class for a door lock
class Lock{

    // Constructor
    constructor(index){

        this.index = index

        // Fill and show the lock modal
        var lockModal = $('#lock-modal')
        lockModal.find('.modal-title').text("The lock needs a combination!")  
        lockModal.find('.modal-body')   
            .empty()                                
            .append('<img class="img-fluid" id="lock-background" src='+lockData[index].lock_img+' alt="Minigame">')

        lockModal.modal('show')  

    }

    // Function to check whether the lock has been activated successfully
    checkCriteria() {

        // For now, assume unlock was successful
        var unlocked = 1

        // If the unlock was successful, move on to the puzzle page
        if (unlocked == 1) {

            // Hide the open modals
            $('#lock-modal').modal('hide')
            $('#door-modal').modal('hide')

            // Also need to update the doorway information to mark it as unlocked
            locations[this.index].locked = 0

            // Open the puzzle modal
            minigame = new Minigame(this.index)

        } else {
        // Otherwise, flash the lock red and remain on the page
        
        }

    }

}

// This is the on click function for 'test' on a lock
function checkLock() {

    // Run the check method from the lock class
    lock.checkCriteria()

}