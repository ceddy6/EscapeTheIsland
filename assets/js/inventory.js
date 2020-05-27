// Outside the inventory class, keep a list of the possible items that could go into the inventory
var inventoryItems = [
    {title:"padlock-key",path:"assets/images/locks/padlock-key.jpg",description:"An old key",useability:"inventory-item-useable"},
    {title:"stepping-stones-clue",path:"assets/images/clues/stepping-stones-clue.png",description:"Some kind of diagram",useability:"inventory-item-viewable"},
    {title:"waterfall-clue",path:"assets/images/clues/waterfall-clue.jpg",description:"Must be a clue to the next location",useability:"inventory-item-viewable"},
    {title:"well-stones-clue",path:"assets/images/clues/well-stones-clue.jpg",description:"Some kind of diagram",useability:"inventory-item-viewable"},
    {title:"well-clue",path:"assets/images/clues/well-clue.jpg",description:"This must be the next location",useability:"inventory-item-viewable"},
    {title:"diallock-clue",path:"assets/images/clues/diallock-clue.jpg",description:"Some kind of clue",useability:"inventory-item-viewable"},
    {title:"volcano-clue",path:"assets/images/clues/volcano-clue.jpg",description:"This must be the next location",useability:"inventory-item-viewable"},
    {title:"obelisk-clue",path:"assets/images/clues/obelisk-clue.jpg",description:"Must be a clue to the next location",useability:"inventory-item-viewable"},
    {title:"skeleton-clue",path:"assets/images/clues/skeleton-clue.jpg",description:"Some kind of clue",useability:"inventory-item-viewable"},
    {title:"skeleton-clue-2",path:"assets/images/minigames/puzzles/obelisk/skeleton-clue-2.jpg",description:"A clue!",useability:"inventory-item-viewable"},
    {title:"key-line-waterfall",path:"assets/images/clues/key-line-waterfall.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-well",path:"assets/images/clues/key-line-well.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-cave",path:"assets/images/clues/key-line-cave.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-volcano",path:"assets/images/clues/key-line-volcano.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-obelisk",path:"assets/images/clues/key-line-obelisk.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"artefact",path:"assets/images/minigames/puzzles/skeleton/artefact.png",description:"The artefact!",useability:"inventory-item-useable"}
]

// Create a class for the inventory
class Inventory {

    // Constructor
    constructor(){

        // The inventory starts empty
        this.contents = []

        // Add the padlock key to it
        //this.addItem("padlock-key")
        //this.addItem("well-stones-clue")

        // Temporarily add the gold tiles to the inventory for debugging purposes
        //this.addItem("key-line-obelisk")
        //this.addItem("key-line-cave")
        //this.addItem("key-line-waterfall")
        //this.addItem("key-line-volcano")
        //this.addItem("key-line-well")
        //this.addItem("artefact")

    }

    // Inventory has a method to add an item
    addItem(item) {

        // Get the entry of the image from the inventory list
        var details = inventoryItems.find(function(entry){return entry.title == item})

        // Check whether item is already in inventory
        var itemInInventory = $('#'+item+'-inventory').length

        if (itemInInventory == 0) {
            // Add the image to the modal 
            $('#inventory-modal').find('.modal-body')
                .append($('<img class="img-fluid inventory-item '+details.useability+'" id='+item+'-inventory src='+details.path+' alt='+item+'>')
                    .attr('data-item',item)
                    // Include an on-click method for that specific item
                    .on("click",function(){inventory.itemClicked($(this).attr('data-item'))})
                )
        }

    }

    // Inventory also has a method for removing items
    removeItem(item) {

        // Remove the item from the modal 
        $('#'+item+'-inventory').remove()    

    }

    // Inventory has a method to display itself
    showInventory() {

        // Show the inventory modal
        $('#inventory-modal').modal('show')
      
    }

    // Inventory has a method to handle items in the inventory being clicked on
    itemClicked(item) {

        // Get the entry of the image from the inventory list
        var details = inventoryItems.find(function(entry){return entry.title == item})

        // If the inventory item is useable, use it, if not, open a zoom
        if (details.useability == "inventory-item-useable") {

            // Check which item was clicked on
            switch(item) {
    
                // If it's the key to the first padlock
                case 'padlock-key':
                    console.log("Key clicked on")
                    // Need to check whether the lock is the right one for the key
                    if (lock.index == 0) {
                        $('#lock-modal').find('.modal-body')
                            .empty()
                            .append('<img class="img-fluid" id="lock-background" src='+lockData[lock.index].inter_img+' alt="Lock with key">')
                            // Add a div to flash red or green on success or failure
                            .append($('<div id="outlineflash"></div>'))
                    }
                    lock.addToLockPath("none")

                    // Close the inventory modal
                    $('#inventory-modal').modal('hide')

                    break;

                // If it's one of the gold tiles
                case 'key-line-cave':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        // Check whether the item is already appended and append it if not
                        if ($('#key-row-cave').length == 0) {
                            $('#minigame-modal').find('.modal-body')
                                .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-cave" src=assets/images/clues/key-line-cave.bmp alt="Key Row">')
                                        .css({"top":"40px"})
                                        .css({"left":"550px"})
                                        .css({"cursor":"pointer"})
                                        .css({"position":"absolute"})
                                        .draggable({
                                            snap:'.sk-grid-row.pkey',
                                            snapMode:"inner",
                                            snapTolerance:"30",
                                        }))
                            //inventory.removeItem(item)
                        }
                    }
                    break;
                case 'key-line-waterfall':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        if ($('#key-row-waterfall').length == 0) {
                            $('#minigame-modal').find('.modal-body')
                                .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-waterfall" src=assets/images/clues/key-line-waterfall.bmp alt="Key Row">')
                                        .css({"top":"100px"})
                                        .css({"left":"550px"})
                                        .css({"cursor":"pointer"})
                                        .css({"position":"absolute"})
                                        .draggable({
                                            snap:'.sk-grid-row.pkey',
                                            snapMode:"inner",
                                            snapTolerance:"30",
                                        }))
                            //inventory.removeItem(item)
                        }
                    }
                    break;
                case 'key-line-well':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        if ($('#key-row-well').length == 0) {
                            $('#minigame-modal').find('.modal-body')
                                .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-well" src=assets/images/clues/key-line-well.bmp alt="Key Row">')
                                        .css({"top":"160px"})
                                        .css({"left":"550px"})
                                        .css({"cursor":"pointer"})
                                        .css({"position":"absolute"})
                                        .draggable({
                                            snap:'.sk-grid-row.pkey',
                                            snapMode:"inner",
                                            snapTolerance:"30",
                                        }))
                            //inventory.removeItem(item)
                        }
                    }
                    break;
                case 'key-line-volcano':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        if ($('#key-row-volcano').length == 0) {
                            $('#minigame-modal').find('.modal-body')
                                .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-volcano" src=assets/images/clues/key-line-volcano.bmp alt="Key Row">')
                                        .css({"top":"220px"})
                                        .css({"left":"550px"})
                                        .css({"cursor":"pointer"})
                                        .css({"position":"absolute"})
                                        .draggable({
                                            snap:'.sk-grid-row.pkey',
                                            snapMode:"inner",
                                            snapTolerance:"30",
                                        }))
                            //inventory.removeItem(item)
                        }
                    }
                    break;
                case 'key-line-obelisk':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        if ($('#key-row-obelisk').length == 0) {
                            $('#minigame-modal').find('.modal-body')
                                .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-obelisk" src=assets/images/clues/key-line-obelisk.bmp alt="Key Row">')
                                        .css({"top":"280px"})
                                        .css({"left":"550px"})
                                        .css({"cursor":"pointer"})
                                        .css({"position":"absolute"})
                                        .draggable({
                                            snap:'.sk-grid-row.pkey',
                                            snapMode:"inner",
                                            snapTolerance:"30",
                                        }))
                            //inventory.removeItem(item)
                        }
                    }
                    break;

                case 'artefact':
                    // If the player is in the village, end the game
                    if ($('#minigame-background').hasClass('in-village')) {
                        $('#inventory-modal').modal('hide')
                        endGame()
                    }
                    break;

            }

        // The item is a 'viewable' item, so open a zoom
        } else {

            // Special case - if it's the well stones clue, we want to append it into the puzzle
            if (item == 'well-stones-clue' && puzzle.index == 2) {

                console.log("Loading clue into puzzle")
                puzzle.appendClue()

                // Close the inventory modal
                $('#inventory-modal').modal('hide')

            }
            // Otherwise, we just want to look at it, so open up a modal
            else {

                // Close the inventory modal
                $('#inventory-modal').modal('hide')

                // Open up a zoom modal
                zoom = new Zoom(details.path,details.title,details.description,0)
            }

        }

    }

}


// On click function to show the inventory
function showInventory(origin) {

    // Just needs to call the method on the inventory object
    inventory.showInventory()
  
}
  