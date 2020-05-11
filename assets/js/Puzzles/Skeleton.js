// Minigame for the cave
class SkeletonPuzzle{

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
    createGrid(puzzid){

        // Copy so we can use jquery
        var self = this

        // Get the canvas to work on
        var canvas = $('#minigame-modal').find('.modal-body')

        // Append a table
        canvas.append('<div class="ob-grid-wrapper puzzle-'+puzzid+'"></div>')
        $('.ob-grid-wrapper.puzzle-'+puzzid).append('<table class="table-fixed puzzle'+puzzid+' ob-grid"></table')
        var tbody = $('.ob-grid.puzzle'+puzzid)
        tbody.append('<tbody class="ob-grid-body puzzle-'+puzzid+'"></tbody>')

        // Append 6 rows
        for (var i=0; i<6; i++) {
            var trow = $('<tr class="ob-grid-col ob-grid-col-'+i+' puzzle-'+puzzid+'"></tr>')
            for (var j=0; j<6; j++) {
                var tcell = $('<td class="ob-grid-cell-outer ob-grid-col-'+i+' ob-grid-row-'+j+' puzzle-'+puzzid+'"></td>')
                var cell = $('<div class="ob-grid-cell-inner puzzle-'+puzzid+'"></div>')
                                .attr('data-grid-row',i)
                                .attr('data-grid-col',j)
                tcell.append(cell)
                trow.append(tcell)
            }
            tbody.append(trow)
        }

        // Append a 'doorway'
        var doorway = $('<div class="doorway puzzle-'+puzzid+'"></div>')
        canvas.append(doorway)

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
