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

        // Fill and show the lock modal
        var lockModal = $('#lock-modal')
        lockModal.find('.modal-title').text("The lock needs a combination!")  
        lockModal.find('.modal-body')   
            .empty()                                
            .append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')

        lockModal.modal('show')  

    }


}