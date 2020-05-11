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

        // On and off grid for squares
        this.gridRotationState = [  
                                    [3,1,1,1,3,3,0,2,1,2,1],
                                    [3,2,2,2,0,3,3,1,1,3,0],
                                    [0,0,1,0,0,3,3,3,1,0,2],
                                    [3,2,0,0,1,1,0,3,3,1,2],
                                    [1,0,0,3,1,2,0,3,1,1,3],
                                    [1,3,2,2,0,0,0,1,1,1,0],
                                    [1,1,0,0,1,1,0,3,3,1,3],
                                    [3,0,0,2,2,1,1,1,0,0,1],
                                    [2,3,2,2,0,0,1,1,3,2,0],
                                    [3,1,3,0,3,0,0,1,2,0,0],
                                    [0,1,1,3,2,1,0,1,0,1,2],
                                ]
        // 0 = end, 1 = straigh, 2 = corner, 3 = tri                        
        this.gridTile =         [ 
                                    [2,1,1,1,2,0,2,2,1,0,0],
                                    [0,0,2,0,3,3,3,3,0,0,1],
                                    [0,1,3,1,1,2,0,0,0,3,3],
                                    [0,2,2,3,2,3,2,3,3,1,0],
                                    [2,2,0,3,1,3,1,0,1,1,0],
                                    [1,2,3,2,2,4,0,2,3,3,1],
                                    [2,3,1,3,2,3,3,3,0,2,3],
                                    [0,3,1,2,0,1,3,3,3,0,1],
                                    [2,2,3,2,0,3,1,1,3,2,1],
                                    [0,0,3,0,2,3,1,0,0,1,1],
                                    [0,1,3,0,0,0,2,1,0,0,0],
                                ]

      // Add the grid for the pipes
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

                // Get the starting angle and type from the setup grids
                var tileIndex = self.gridTile[i][j]
                var tileAngle = self.gridRotationState[i][j] * 90

                // Create the cell
                var cell = $('<div class="v-grid-cell-inner"></div>')
                                .attr('data-grid-row',i)
                                .attr('data-grid-col',j)
                                
                switch(tileIndex){
                    case 0:
                        cell.append('<img class="img-fluid lava-tile" src=assets/images/minigames/puzzles/volcano/end.bmp alt="Tile">')
                        break;
                    case 1:
                        cell.append('<img class="img-fluid lava-tile" src=assets/images/minigames/puzzles/volcano/line.bmp alt="Tile">')
                        break;
                    case 2:
                        cell.append('<img class="img-fluid lava-tile" src=assets/images/minigames/puzzles/volcano/corner.bmp alt="Tile">')
                        break;
                    case 3:
                        cell.append('<img class="img-fluid lava-tile" src=assets/images/minigames/puzzles/volcano/tri.bmp alt="Tile">')
                        break;
                    case 4:
                        cell.append('<img class="img-fluid lava-tile" src=assets/images/minigames/puzzles/volcano/start.bmp alt="Tile">')
                        break;
                }
                // Apply a rotation to the tile, and an on-click to rotate
                cell.find('.lava-tile').css({"transform":"rotate("+tileAngle+"deg)"})
                                        .attr('data-cell-type',tileIndex)
                                        .attr('data-cell-angle',tileAngle)
                                        .attr('data-cell-live',0)
                                        .on("click",function(){rotateTile(this)})
                  
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


// Function to rotate the tile
function rotateTile(tile){

    // Get the current angle, add 90 degress
    var currentAngle = $(tile).attr('data-cell-angle')
    var newAngle = parseInt(currentAngle)+90 

    // Apply the new angle to the element
    $(tile).css({"transform":"rotate("+newAngle+"deg)"})
    $(tile).attr('data-cell-angle',newAngle)

}
