
// Each minigame is its own class. The constructor needs to create the modal for it
class Minigame{

    // Constructor
    constructor(index){

        // Create the minigame modal and show
        var minigameModal = $('#minigame-modal')
        minigameModal.find('.modal-title').text("You see a puzzle!")  
        minigameModal.find('.modal-body')   
            .empty()                                
            .append('<img class="img-fluid" id="minigame1-background" src='+locations[index].minigame_img+' alt="Minigame">')
        minigameModal.modal('show')  

    }

}