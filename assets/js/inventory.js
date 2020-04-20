// On click function to show the inventory
function showInventory(origin) {

    // Hide the modal that you came from
    $('#'+origin).modal('hide')
    // Show the inventory modal
    $('#inventory-modal').modal('show')
  
    // Add an attribute, to provide the origin so we can reopen the lower modal
    $('#inventory-modal').attr('origin',origin)
  
  }
  
  // Need a function to handle clicks on items in the inventory
  function inventoryItemClicked(item) {
  
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

    // Close the inventory modal
    $('#inventory-modal').modal('hide')
  
    // Reopen whatever modal it came from
    var modalOrigin = $('#inventory-modal').attr('origin')
    setTimeout(function(){$('#'+modalOrigin).modal('show')},500)
  
  }
  