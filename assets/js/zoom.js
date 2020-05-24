// This is a class for a zoomed in view of an object
class Zoom {

    // Constructor
    constructor(path,id,desc,snapable){

        // Add the attributes
        this.path = path
        this.id = id
        this.desc = desc

        // Fill the zoom modal with the image and open it
        var modal = $('#zoom-modal')
        modal.find('.modal-title').text(desc) 
        modal.find('.modal-body').empty()
            .append('<img class="img-fluid" id='+id+'-zoomed src='+path+' alt="Zoomed Image">')
        modal.modal('show')

        // Check whether the zoomed image is capturable, and hide the take a picture button if not
        if (snapable == 1) {
            $('#snapshot-button').css({"display":"inline-block"}).text('Take a picture')
        } else if (snapable == 2) {
            $('#snapshot-button').css({"display":"inline-block"}).text('Take')
        } else {
            $('#snapshot-button').css({"display":"none"})
        }

    }

    // Function to add the image to the inventory
    takeAPicture(){

        console.log("Taking a picture")

        // Select the inventory modal, and append the correct picture
        inventory.addItem(this.id)

        // Remove the clue from the game
        $('#'+this.id).remove()

        // Close the zoom modal, and open the inventory
        $('#zoom-modal').modal('hide')
        $('#inventory-modal').modal('show')

    }

}

// Function to add a picture of the currently zoomed view to the inventory
function takeAPicture(){
    zoom.takeAPicture()
}