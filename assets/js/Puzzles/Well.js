// Minigame for the cave
class WellPuzzle{

    // Constructor adds all the elements
    constructor(index){

        // Select the modal body for content (and empty both of them)
        var canvas = $('#minigame-modal').find('.modal-body').empty()
        var title = $('#minigame-modal').find('.modal-title').empty()

        // Add the the background and the title
        canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        title.text("The stones of the well are marked...")

        // Create the table as a separate method
        this.createGrid()

        // If the puzzle has been completed, show the opened hiding place
        if (locations[index].complete == 1) {
            this.openHidingPlace()
        }

        // Show the modal
        $('#minigame-modal').modal('show')

    }

    // Function for creating a grid of stones
    createGrid(){

        // Get the canvas to work on
        var canvas = $('#minigame-modal').find('.modal-body')

        // Append a table
        canvas.append('<div class="well-grid-wrapper"></div>')
        $('.well-grid-wrapper').append('<table class="table-fixed" id="well-grid"></table')
        var tbody = $('#well-grid')
        tbody.append('<tbody id="well-grid-body"></tbody>')

        // Append 22 rows
        for (var i=0; i<80; i++) {
            var trow = $('<tr class="well-grid-col" id="well-grid-col-'+i+'"></tr>')
            for (var j=0; j<5; j++) {
                var tcell = $('<td class="well-grid-cell well-grid-col-'+i+' well-grid-row-'+j+'"></td>')
                var cell = $('<div class="well-grid-cell-wrapper">T</div>')
                tcell.append(cell)
                trow.append(tcell)
            }
            tbody.append(trow)
        }

    }

    // Method for checking whether the puzzle is complete (needs to be called after dragging events)
    checkComplete(){
    

    }

    // This method replaces the background with one with an open hiding space
    openHidingPlace(){


    }

}