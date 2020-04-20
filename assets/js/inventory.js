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
  
    // Close the inventory modal
    $('#inventory-modal').modal('hide')
  
    // Reopen whatever modal it came from
    var modalOrigin = $('#inventory-modal').attr('origin')
    setTimeout(function(){$('#'+modalOrigin).modal('show')},500)
  
    switch(item) {
  
      case 'padlock-key':
        console.log("Key clicked on")
        break;
  
    }
  
  }
  