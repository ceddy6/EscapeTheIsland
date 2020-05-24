// Outside the inventory class, keep a list of the possible items that could go into the inventory
var inventoryItems = [
    {title:"padlock-key",path:"assets/images/locks/padlock-key.jpg",description:"An old key",useability:"inventory-item-useable"},
    {title:"stepping-stones-clue",path:"assets/images/clues/stepping-stones-clue.png",description:"Some kind of diagram",useability:"inventory-item-viewable"},
    {title:"waterfall-clue",path:"assets/images/clues/waterfall-clue.jpg",description:"Must be a clue to the next location",useability:"inventory-item-viewable"},
    {title:"well-stones-clue",path:"assets/images/clues/well-stones-clue.jpg",description:"Some kind of diagram",useability:"inventory-item-viewable"},
    {title:"well-clue",path:"assets/images/clues/well-clue.jpg",description:"This must be the next location",useability:"inventory-item-viewable"},
    {title:"volcano-clue",path:"assets/images/clues/volcano-clue.jpg",description:"This must be the next location",useability:"inventory-item-viewable"},
    {title:"obelisk-clue",path:"assets/images/clues/obelisk-clue.jpg",description:"Must be a clue to the next location",useability:"inventory-item-viewable"},
    {title:"skeleton-clue",path:"assets/images/minigames/puzzles/obelisk/skeleton-clue.bmp",description:"Some kind of clue",useability:"inventory-item-viewable"},
    {title:"skeleton-clue-2",path:"assets/images/minigames/puzzles/obelisk/skeleton-clue-2.jpg",description:"A clue!",useability:"inventory-item-viewable"},
    {title:"key-line-waterfall",path:"assets/images/clues/key-line-waterfall.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-well",path:"assets/images/clues/key-line-well.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-cave",path:"assets/images/clues/key-line-cave.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-volcano",path:"assets/images/clues/key-line-volcano.bmp",description:"A gold tile!",useability:"inventory-item-useable"},
    {title:"key-line-obelisk",path:"assets/images/clues/key-line-obelisk.bmp",description:"A gold tile!",useability:"inventory-item-useable"}
]

// Create a class for the inventory
class Inventory {

    // Constructor
    constructor(){

        // The inventory starts empty
        this.contents = []

        // Add the padlock key to it
        this.addItem("padlock-key")

        // Temporarily add the gold tiles to the inventory for debugging purposes
        //this.addItem("key-line-2")
        //this.addItem("key-line-3")
        //this.addItem("key-line-4")
        //this.addItem("key-line-5")
        //this.addItem("key-line-6")

    }

    // Inventory has a method to add an item
    addItem(item) {

        // Get the entry of the image from the inventory list
        var details = inventoryItems.find(function(entry){return entry.title == item})

        // Add the image to the modal 
        $('#inventory-modal').find('.modal-body')
            .append($('<img class="img-fluid inventory-item '+details.useability+'" id='+item+'-inventory src='+details.path+' alt='+item+'>')
                .attr('data-item',item)
                // Include an on-click method for that specific item
                .on("click",function(){inventory.itemClicked($(this).attr('data-item'))})
            )

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
                case 'key-line-2':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        $('#minigame-modal').find('.modal-body')
                            .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-2" src=assets/images/minigames/puzzles/skeleton/key-line-2.bmp alt="Key Row">')
                                    .css({"top":"40px"})
                                    .css({"left":"575px"})
                                    .css({"cursor":"pointer"})
                                    .css({"position":"absolute"})
                                    .draggable({
                                        snap:'.sk-grid-row.pkey',
                                        snapMode:"inner",
                                        snapTolerance:"30",
                                    }))
                        inventory.removeItem(item)
                    }
                    break;
                case 'key-line-3':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        $('#minigame-modal').find('.modal-body')
                            .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-3" src=assets/images/minigames/puzzles/skeleton/key-line-3.bmp alt="Key Row">')
                                    .css({"top":"100px"})
                                    .css({"left":"575px"})
                                    .css({"cursor":"pointer"})
                                    .css({"position":"absolute"})
                                    .draggable({
                                        snap:'.sk-grid-row.pkey',
                                        snapMode:"inner",
                                        snapTolerance:"30",
                                    }))
                        inventory.removeItem(item)
                    }
                    break;
                case 'key-line-4':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        $('#minigame-modal').find('.modal-body')
                            .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-4" src=assets/images/minigames/puzzles/skeleton/key-line-4.bmp alt="Key Row">')
                                    .css({"top":"160px"})
                                    .css({"left":"575px"})
                                    .css({"cursor":"pointer"})
                                    .css({"position":"absolute"})
                                    .draggable({
                                        snap:'.sk-grid-row.pkey',
                                        snapMode:"inner",
                                        snapTolerance:"30",
                                    }))
                        inventory.removeItem(item)
                    }
                    break;
                case 'key-line-5':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        $('#minigame-modal').find('.modal-body')
                            .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-5" src=assets/images/minigames/puzzles/skeleton/key-line-5.bmp alt="Key Row">')
                                    .css({"top":"220px"})
                                    .css({"left":"575px"})
                                    .css({"cursor":"pointer"})
                                    .css({"position":"absolute"})
                                    .draggable({
                                        snap:'.sk-grid-row.pkey',
                                        snapMode:"inner",
                                        snapTolerance:"30",
                                    }))
                        inventory.removeItem(item)
                    }
                    break;
                case 'key-line-6':
                    // If the puzzle is the right one, add a full sized tile to the puzzle
                    if (puzzle.index == 5) {
                        $('#minigame-modal').find('.modal-body')
                            .append($('<img class="img-fluid tile-row tile-row-draggable" id="key-row-6" src=assets/images/minigames/puzzles/skeleton/key-line-6.bmp alt="Key Row">')
                                    .css({"top":"280px"})
                                    .css({"left":"575px"})
                                    .css({"cursor":"pointer"})
                                    .css({"position":"absolute"})
                                    .draggable({
                                        snap:'.sk-grid-row.pkey',
                                        snapMode:"inner",
                                        snapTolerance:"30",
                                    }))
                        inventory.removeItem(item)
                    }
                    break;

            }

        // The item is a 'viewable' item, so open a zoom
        } else {

            // Close the inventory modal
            $('#inventory-modal').modal('hide')

            // Open up a zoom modal
            zoom = new Zoom(details.path,details.title,details.description,0)

        }

    }

}


// On click function to show the inventory
function showInventory(origin) {

    // Just needs to call the method on the inventory object
    inventory.showInventory()
  
}
  