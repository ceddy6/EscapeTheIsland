
// Each minigame is its own class. The constructor needs to create the modal for it
class Minigame{

    // Constructor
    constructor(index){

        // Create the minigame modal and show
        var minigameModal = $('#minigame-modal')

        // Text at the top of the game
        switch(index) {
            case 0:
                var desc = "There are some strange icons on the walls..."
                break;
            default:
                var desc = "You see a puzzle!"
                break;
        }
        minigameModal.find('.modal-title').text(desc)
        
        // Populate the modal body
        var game = minigameModal.find('.modal-body')   
                                .empty()                                
                                .append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        
        // Add the main elements of each game
        switch(index){
            case 0:
                puzzle = new CavePuzzle()
                break;
            default:
                break;
        } 
        
        // Finally, show the modal
        minigameModal.modal('show')  

    }

}