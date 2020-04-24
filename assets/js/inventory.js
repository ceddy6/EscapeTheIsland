// Outside the inventory class, keep a list of the possible items that could go into the inventory
var inventoryItems = [
    {title:"padlock-key",path:"assets/images/locks/padlock-key.jpg",description:"An old key",useability:"inventory-item-useable"},
    {title:"stepping-stones-clue",path:"assets/images/minigames/puzzles/cave/clue.bmp",description:"Some kind of diagram",useability:"inventory-item-viewable"},
    {title:"waterfall-clue",path:"assets/images/minigames/puzzles/cave/clue2.bmp",description:"Sounds like a riddle",useability:"inventory-item-viewable"}
]

// Create a class for the inventory
class Inventory {

    // Constructor
    constructor(){

        // The inventory starts empty
        this.contents = []

        // Add the padlock key to it
        this.addItem("padlock-key")

    }

    // Inventory has a method to add an item
    addItem(item) {

        // Get the entry of the image from the inventory list
        var details = inventoryItems.find(function(entry){return entry.title == item})

        // Add the image to the modal 
        $('#inventory-modal').find('.modal-body')
            .append('<img class="img-fluid inventory-item '+details.useability+'" id='+item+'-inventory src='+details.path+' alt='+item+'>')
        
            // Include an on-click method for that specific item
            .on("click",function(){inventory.itemClicked(item)})

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

        // Close the inventory modal
        $('#inventory-modal').modal('hide')

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
                    break;
            }

        // The item is a 'viewable' item, so open a zoom
        } else {

            // Open up a zoom modal
            zoom = new Zoom(details.path,details.title,details.description,0)

        }

    }

}


// On click function to show the inventory
function showInventory(origin) {

    // Just needs to call the method on the inventory object
    inventory.showInventory()

    // // Hide the modal that you came from
    // $('#'+origin).modal('hide')
    // // Show the inventory modal
    // $('#inventory-modal').modal('show')
  
    // // Add an attribute, to provide the origin so we can reopen the lower modal
    // $('#inventory-modal').attr('origin',origin)
  
}
  
// // Need a function to handle clicks on items in the inventory
// function inventoryItemClicked(item) {
  
//     // Check which item was clicked on
//     switch(item) {
  
//         // If it's the key to the first padlock
//         case 'padlock-key':
//             console.log("Key clicked on")
//             // Need to check whether the lock is the right one for the key
//             if (lock.index == 0) {
//                 $('#lock-modal').find('.modal-body')
//                     .empty()
//                     .append('<img class="img-fluid" id="lock-background" src='+lockData[lock.index].inter_img+' alt="Lock with key">')
//                     // Add a div to flash red or green on success or failure
//                     .append($('<div id="outlineflash"></div>'))
//             }
//             lock.addToLockPath("none")
//             break;
//         }

//     // Close the inventory modal
//     $('#inventory-modal').modal('hide')
  
//     // Reopen whatever modal it came from
//     var modalOrigin = $('#inventory-modal').attr('origin')
//     $('#'+modalOrigin).modal('show')
  
// }
  