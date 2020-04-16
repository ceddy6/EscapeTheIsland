// Class for the entryways to the minigames
class Doorway{

    // Constructor
    constructor(index){

        // The first thing to do is check wether the door is locked (if not, bypass it)
        if (locations[index].locked == 1) {

            // Create doorway modal and show  
            var doorwayModal = $('#door-modal')
            doorwayModal.find('.modal-title').text("You see a locked door")  
            doorwayModal.find('.modal-body')   
                .empty()                                
                .append('<img class="img-fluid" id="minigame1-background" src='+locations[index].doorway_img+' alt="Window">')
            doorwayModal.modal('show')   

        } else {

            // Skip straight to creating the minigame modal

        }

    }

}