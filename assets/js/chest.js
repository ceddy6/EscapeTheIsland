// Class for the treasure chests to be opened
class Chest{

    // Constructor
    constructor() {

        // Create and append location objects
        $('#minigame1 .modal-body').append($('<img class="minigame1-chest" id="minigame1-chest" src="assets/images/chest.jpg" alt="Chest">')
                                    .css({"position":"absolute"})
                                    .css({"bottom":"10%"})
                                    .css({"right":"10%"})      
                                    )

    }

}