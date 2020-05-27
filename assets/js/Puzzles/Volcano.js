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
        title.text("At the volcano you see a strange grid of pipes. It looks like the lava could be used to power something...")

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

        // Number of rows and columns
        this.nRows = 11
        this.nCols = 11

        // this.gridRotationState = [[0,0,0],[0,0,0],[0,0,0],]
        // this.gridTile = [[2,1,2],[3,3,3],[2,3,2],]
        // this.nRows = 3
        // this.nCols = 3

        // Add the grid for the pipes
        this.createGrid()

        // If the puzzle has been completed, show the opened hiding place
        if (locations[index].complete == 1) {
            this.openHidingPlace()
        }

        // Update the flow
        updateFlow()

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
        for (var i=0; i<self.nRows; i++) {
            var trow = $('<tr class="v-grid-col v-grid-col-'+i+'"></tr>')
            for (var j=0; j<self.nCols; j++) {
                var tcell = $('<td class="v-grid-cell-outer v-grid-col-'+i+' v-grid-row-'+j+'"></td>')

                // Get the starting angle and type from the setup grids
                var tileIndex = self.gridTile[i][j]
                var tileAngle = self.gridRotationState[i][j] * 90

                // Create the cell
                var cell = $('<div class="v-grid-cell-inner"></div>')
                                
                switch(tileIndex){
                    case 0:
                        cell.append('<img class="img-fluid lava-tile tile-inactive tile-0" src=assets/images/minigames/puzzles/volcano/end.bmp alt="Tile">')
                        var neighbours = JSON.stringify([0])
                        break;
                    case 1:
                        cell.append('<img class="img-fluid lava-tile tile-inactive tile-1" src=assets/images/minigames/puzzles/volcano/line.bmp alt="Tile">')
                        var neighbours = JSON.stringify([1,3])
                        break;
                    case 2:
                        cell.append('<img class="img-fluid lava-tile tile-inactive tile-2" src=assets/images/minigames/puzzles/volcano/corner.bmp alt="Tile">')
                        var neighbours = JSON.stringify([0,3])
                        break;
                    case 3:
                        cell.append('<img class="img-fluid lava-tile tile-inactive tile-3" src=assets/images/minigames/puzzles/volcano/tri.bmp alt="Tile">')
                        var neighbours = JSON.stringify([0,1,3])
                        break;
                    case 4:
                        cell.append('<img class="img-fluid lava-tile tile-active tile-4" src=assets/images/minigames/puzzles/volcano/start.bmp alt="Tile">')
                        var neighbours = JSON.stringify([0,1,3])
                        break;
                }
                // Apply a rotation to the tile, and an on-click to rotate
                cell.find('.lava-tile').css({"transform":"rotate("+tileAngle+"deg)"})
                                        .attr('data-cell-type',tileIndex)
                                        .attr('data-cell-angle',tileAngle)
                                        .attr('data-grid-row',i)
                                        .attr('data-grid-col',j)
                                        .attr('data-base-neighbours',neighbours)
                                        .attr('data-cell-neighbours',neighbours)
                                        .on("click",function(){rotateTile(this)})
                  
                tcell.append(cell)
                trow.append(tcell)

                updateNeighbours(cell.find('.lava-tile'))
            }
            tbody.append(trow)
        }

    }

    // This method replaces the background with one with an open hiding space
    openHidingPlace(){

        console.log("Opening hiding place")

        // Append a black div to the main block
        var emptySpace = $('<div id="empty-space"></div>')
        $('#minigame-modal').find('.modal-body').append(emptySpace)

        // Append the clues
            var clue1 = $('<img class="img-fluid" id="waterfall-clue" src=assets/images/clues/waterfall-clue.jpg alt="Clue1">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/waterfall-clue.jpg','waterfall-clue','Could this be the next location?',1)})
            var clue2 = $('<img class="img-fluid" id="key-line-volcano" src=assets/images/clues/key-line-volcano.bmp alt="Clue2">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/key-line-volcano.bmp','key-line-volcano','Well these are starting to pile up...',2)})
            $('#empty-space').append(clue1).append(clue2)

    }

}


// Function to rotate the tile
function rotateTile(tile){

    console.log("Rotating Tile")

    // Get the current angle, add 90 degress
    var currentAngle = $(tile).attr('data-cell-angle')
    var newAngle = parseInt(currentAngle)+90 

    // Apply the new angle to the element
    $(tile).css({"transform":"rotate("+newAngle+"deg)"})
    $(tile).attr('data-cell-angle',newAngle)

    // Update the neighbours
    updateNeighbours(tile)

    // Update the flow
    updateFlow()

}

// Function to update the flow of the lava
function updateFlow(){
   
    // Set all tiles to inactive
    $('.lava-tile').removeClass('tile-active')
                                    .addClass('tile-inactive')
                                
    // Update the image for each tile
    $('.lava-tile').each(function(){
        var tileType = parseInt($(this).attr('data-cell-type'))
        switch(tileType){
            case 0:
                var newSrc = 'assets/images/minigames/puzzles/volcano/end.bmp'
                break;
            case 1:
                var newSrc = 'assets/images/minigames/puzzles/volcano/line.bmp'
                break;
            case 2:
                var newSrc = 'assets/images/minigames/puzzles/volcano/corner.bmp'
                break;
            case 3:
                var newSrc = 'assets/images/minigames/puzzles/volcano/tri.bmp'
                break;
            case 4:
                var newSrc = 'assets/images/minigames/puzzles/volcano/start.bmp'
                break;
        }
        $(this).attr('src',newSrc)
    })

    // List of points to be checked whether they're connected to the center
    var toCheck = [[5,5]] 
    var nIter = 0

    // // Keep looping down branches until you run out of things to check
    while (toCheck.length > 0  && nIter < 125) {

        // Take the first tile from the to check list, get its bordering tiles, 
        // and check whether they are connected. If they are connected, add them
        // to the list of tiles to check, and fill them in.

        // Get the tile
        var c = toCheck[0]
        var tile = $('.lava-tile[data-grid-row='+c[0]+'][data-grid-col='+c[1]+']')

        // Get the surrounding tiles
        var above = $('.lava-tile[data-grid-row='+(c[0]-1)+'][data-grid-col='+c[1]+']')
        var below = $('.lava-tile[data-grid-row='+(c[0]+1)+'][data-grid-col='+c[1]+']')
        var left =  $('.lava-tile[data-grid-row='+c[0]+'][data-grid-col='+(c[1]-1)+']')
        var right = $('.lava-tile[data-grid-row='+c[0]+'][data-grid-col='+(c[1]+1)+']')

        // Check which sides of the current tile have outflows
        var neighbours = JSON.parse(tile.attr('data-cell-neighbours'))

        // For each of the neighbours, check whether the neighbour has a matching connection
        for (var neighbour of neighbours) {

            // Loop through all neighbours
            switch(neighbour){

                // Depending on which side it's on, get the neighbour and the required neighbour's neighbour for a connection
                case 0:
                    var next = above 
                    var req = 2
                    break;
                case 1:
                    var next = right
                    var req = 3
                    break;
                case 2:
                    var next = below
                    var req = 0
                    break;
                case 3:
                    var next = left
                    var req = 1
                    break;

            }

            if (next.length > 0) {

                // Get the neighbours of the neighbour
                var nextNeighbours = JSON.parse(next.attr('data-cell-neighbours'))

                // Loop through the neighbours of the neighbour - if 'req' is in there, a connection is made
                for (var nextNeighbour of nextNeighbours) {

                    // If there is a connection, do some things
                    if (nextNeighbour == req) {

                        // Add the tile to the 'to check' list (if it hasn't already been added)
                        if (next.hasClass('tile-inactive')) {
                            var newRow = next.attr('data-grid-row')
                            var newCol = next.attr('data-grid-col')
                            toCheck.push([parseInt(newRow),parseInt(newCol)])
                        }

                        // Activate the tile
                        next.addClass('tile-active')
                        next.removeClass('tile-inactive')

                        // Update the image
                        var tileType = parseInt(next.attr('data-cell-type'))
                        switch(tileType){

                            case 0:
                                var newSrc = 'assets/images/minigames/puzzles/volcano/end_full.bmp'
                                break;
                            case 1:
                                var newSrc = 'assets/images/minigames/puzzles/volcano/line_full.bmp'
                                break;
                            case 2:
                                var newSrc = 'assets/images/minigames/puzzles/volcano/corner_full.bmp'
                                break;
                            case 3:
                                var newSrc = 'assets/images/minigames/puzzles/volcano/tri_full.bmp'
                                break;
                            case 4:
                                var newSrc = 'assets/images/minigames/puzzles/volcano/start.bmp'

                        }
                        next.attr('src',newSrc)

                    }

                }

            }

        }

        // Remove the current tile from the toCheck list
        toCheck.shift()

        nIter = nIter + 1

    }

    // Check puzzle for completion
    checkCompletion()

}

// This function is to update the neighbours of a tile given the current angle
function updateNeighbours(tile){

    // Check which sides of the current tile have outflows
    var baseNeighbours = JSON.parse($(tile).attr('data-base-neighbours'))
    var neighbours = []
    var angle = parseInt($(tile).attr('data-cell-angle')/90)

    // Add the angle to each of the base neighbours
    for (i in baseNeighbours){
        neighbours[i] = parseInt(baseNeighbours[i]) + angle
        while (neighbours[i] > 3) {
            neighbours[i] = neighbours[i]-4
        }
    }

    // Apply the attribute to the tile
    $(tile).attr('data-cell-neighbours',JSON.stringify(neighbours))

}

// This function checks whether the puzzle is completed
function checkCompletion(){

    // Select all end tiles with inactive classes
    var inactiveEnds = $('.tile-0.tile-inactive')

    // If there are no inactive ends, the puzzle is complete
    //if (inactiveEnds.length == 0) {
    if (inactiveEnds.length < 33) {

        // Check whether the location is already open
        if (locations[puzzle.index].complete == 0) {

            // Show a dialogue modal, describing the entry opening
            $('#dialogue-modal').find('.modal-title').text('With a loud grinding sound, a part of the wall rolls aside...')
            $('#dialogue-modal').modal('show')

            // Open the hiding place
            puzzle.openHidingPlace()

            // Mark puzle as complete
            locations[puzzle.index].complete = 1

        }

    }

}