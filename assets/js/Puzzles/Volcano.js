// Minigame for the cave
class VolcanoPuzzle{

    // Constructor adds all the elements
    constructor(index){

        this.index = index

        // Select the modal body for content (and empty both of them)
        var canvas = $('#minigame-modal').find('.modal-body').empty()
        var title = $('#minigame-modal').find('.modal-title').empty()

        // Add the the background and the title
        canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        title.text("It looks like the lava could be used to power something...")

        // Add the grid for the cars
        this.createGrid()

        // On and off grid for squares
        this.gridState = [  
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0]
                        ]

        // If the puzzle has been completed, show the opened hiding place
        if (locations[index].complete == 1) {
            this.openHidingPlace()
        }

        // Show the modal
        $('#minigame-modal').modal('show')

    }

    // Function for creating a grid of stones
    createGrid(){

        // Copy so we can use jquery
        var self = this

        // Get the canvas to work on
        var canvas = $('#minigame-modal').find('.modal-body')

        // Append a table
        canvas.append('<div class="v-grid-wrapper"></div>')
        $('.v-grid-wrapper').append('<table class="table-fixed v-grid"></table')
        var tbody = $('.v-grid')
        tbody.append('<tbody class="v-grid-body"></tbody>')

        // Append 11 rows
        for (var i=0; i<11; i++) {
            var trow = $('<tr class="v-grid-col v-grid-col-'+i+'"></tr>')
            for (var j=0; j<11; j++) {
                var tcell = $('<td class="v-grid-cell-outer v-grid-col-'+i+' v-grid-row-'+j+'"></td>')
                var cell = $('<div class="v-grid-cell-inner"></div>')
                                .attr('data-grid-row',i)
                                .attr('data-grid-col',j)
                tcell.append(cell)
                trow.append(tcell)
            }
            tbody.append(trow)
        }

    }

    // This method replaces the background with one with an open hiding space
    openHidingPlace(){

        // // Append a black div to the main block
        // var hollowBlock = $('<div class="hollowBlock puzzle-'+puzzid+'"></div>')
        // $('.block-0.puzzle-'+puzzid).append(hollowBlock)

        // // Append the clues
        // if (puzzid == 1) {
        //     var clue1 = $('<img class="img-fluid" id="skeleton-clue" src=assets/images/minigames/puzzles/obelisk/skeleton-clue.bmp alt="Clue1">')
        //             .on("click",function(){zoom = new Zoom('assets/images/minigames/puzzles/obelisk/skeleton-clue.bmp','skeleton-clue','This must be some sort of clue',1)})
        //     $('.block-0.puzzle-1').append(clue1)
        // }
        // if (puzzid == 2) {
        //     var clue2 = $('<img class="img-fluid" id="skeleton-clue-2" src=assets/images/minigames/puzzles/obelisk/skeleton-clue-2.jpg alt="Clue2">')
        //             .on("click",function(){zoom = new Zoom('assets/images/minigames/puzzles/obelisk/skeleton-clue-2.jpg','skeleton-clue-2','This must be a clue to the next location',1)})
        //     $('.block-0.puzzle-2').append(clue2)
        // }

    }

}
