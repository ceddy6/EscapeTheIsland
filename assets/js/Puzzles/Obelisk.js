// Minigame for the cave
class ObeliskPuzzle{

    // Constructor adds all the elements
    constructor(index){

        // Select the modal body for content (and empty both of them)
        var canvas = $('#minigame-modal').find('.modal-body').empty()
        var title = $('#minigame-modal').find('.modal-title').empty()

        // Add the the background and the title
        canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        title.text("On of these stones looks a different shade...")

        // Add the grid for the cars
        this.createGrid()

        // Position coordinates for the grid rows
        //this.rowCoords = ["0px","60px","","","",""]
        //this.colCoords = ["","","","","",""]

        // On and off grid for squares
        this.gridState = [  
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0]
                        ]

        // Add cars ([row,col], 0-indexed)
        var b0 = new Block(this,2,"hor",[2,1],0,this.rowCoords,this.colCoords)
        var b1 = new Block(this,2,"ver",[0,1],1,this.rowCoords,this.colCoords)
        var b2 = new Block(this,2,"ver",[3,2],2,this.rowCoords,this.colCoords)
        var b3 = new Block(this,2,"ver",[1,3],3,this.rowCoords,this.colCoords)
        var b4 = new Block(this,2,"ver",[1,5],4,this.rowCoords,this.colCoords)
        var b5 = new Block(this,2,"ver",[4,5],5,this.rowCoords,this.colCoords)
        var b6 = new Block(this,2,"hor",[4,3],6,this.rowCoords,this.colCoords)
        var b7 = new Block(this,3,"ver",[1,0],7,this.rowCoords,this.colCoords)
        var b8 = new Block(this,3,"hor",[0,3],8,this.rowCoords,this.colCoords)
        var b9 = new Block(this,3,"hor",[3,3],9,this.rowCoords,this.colCoords)

        // If the puzzle has been completed, show the opened hiding place
        if (locations[index].complete == 1) {
            this.openHidingPlace()
        }

        // Call the function to update the grid state
        updateGridState(this)

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
        canvas.append('<div class="ob-grid-wrapper"></div>')
        $('.ob-grid-wrapper').append('<table class="table-fixed" id="ob-grid"></table')
        var tbody = $('#ob-grid')
        tbody.append('<tbody id="ob-grid-body"></tbody>')

        // Append 6 rows
        for (var i=0; i<6; i++) {
            var trow = $('<tr class="ob-grid-col" id="ob-grid-col-'+i+'"></tr>')
            for (var j=0; j<6; j++) {
                var tcell = $('<td class="ob-grid-cell-outer ob-grid-col-'+i+' ob-grid-row-'+j+'"></td>')
                var cell = $('<div class="ob-grid-cell-inner"></div>')
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

        // Append a black div to the fifth stone
        //$('.well-grid-cell-wrapper[data-grid-row="67"][data-grid-col="4"]')
        //    .empty()
        //    .append('<div class="well-stone" id="black-well-stone"></div>')

        // Append the clues
        //var clue1 = $('<img class="img-fluid" id="well-stones-clue" src=assets/images/minigames/puzzles/waterfall/well-stones-clue.jpg alt="Clue1">')
        //        .on("click",function(){zoom = new Zoom('assets/images/minigames/puzzles/waterfall/well-stones-clue.jpg','well-stones-clue','This must be some sort of hint',1)})
        //var clue2 = $('<img class="img-fluid" id="well-clue" src=assets/images/minigames/puzzles/waterfall/well-clue.bmp alt="Clue2">')
        //        .on("click",function(){zoom = new Zoom('assets/images/minigames/puzzles/waterfall/well-clue.bmp','well-clue','This must be a clue to the next location',1)})
        //$('#minigame-modal').find('.modal-body').append(clue1).append(clue2)

    }

}

// Class for blocks that can move on the grid
class Block{

    // Constructor
    constructor(puzzle,size,orientation,position,num,rowCoords,colCoords){

        var blockSize = 60
        var margin = 5

        // Create a block div
        var block = $('<div class="block" id="block-'+num+'"></div>')
        // Add classes for the orientation and size
        switch(orientation){
            case "hor":
                block.addClass('block-hor')
                var axis = "x"
                break;
            case "ver":
                block.addClass('block-ver')
                var axis = "y"
                break;
        }
        block.addClass("block-size-"+size)

        // Get the grid, and append the block
        $('#ob-grid-body').append(block)

        // Make the block draggable
        block.draggable({
            // Keep them in the right window
            containment:$('#minigame-modal').find('.ob-grid-wrapper'),
            snap:'.ob-grid-cell-inner',
            snapMode:"inner",
            snapTolerance:"30",
            axis:axis
        })

        // Update the grid on mouseup
        block.on("mouseup",function(){updateGridState(puzzle)})

        // Starting positions for the blocks
        block.css({"top":(position[0]*blockSize+margin) + "px"})
            .css({"left":(position[1]*blockSize+margin) + "px"})

    }

}

// Function 
function updateGridState(puzzle){
    
    console.log("Updating grid state!")

    // On and off grid for squares (set all to 0)
    puzzle.gridState = [  
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ]
    // Get the coordinates from the puzzle
    rowCoords = puzzle.rowCoords
    colCoords = puzzle.colCoords

    //Select the block
    var blockList = $('.block')

    blockList.each(function(){

        // Get its position and convert to coordinates
        var top = $(this).css("top")
        var left = $(this).css("left")
        top = parseInt(top.slice(0,-2))
        left = parseInt(left.slice(0,-2))
        row = Math.round((top-5)/60)
        col = Math.round((left-5)/60)

        // Add the 1 to the state
        puzzle.gridState[row][col] = 1

        // Find out whether it's vertical or horizontal, and how big it is, and add ones as needed
        if ($(this).hasClass("block-hor")) {
            puzzle.gridState[row][col+1] = 1
            if ($(this).hasClass("block-size-3")) {
                puzzle.gridState[row][col+2] = 1
            }
        } else {
            puzzle.gridState[row+1][col] = 1
            if ($(this).hasClass("block-size-3")) {
                puzzle.gridState[row+2][col] = 1
            }
        }

    })

    console.log(puzzle.gridState)

    // Create a limiting block for each of the blocks
    calculateConstraints(puzzle)

}

// Function creates a constraint block for each of the blocks based on the grid in use
function calculateConstraints(puzzle) {

    console.log("Calculating constraints")

    // Get the origin row and column of the block
    var b = $('#block-0')
    var ori_left = b.css("left")
    var ori_top = b.css("top")
    ori_top = parseInt(ori_top.slice(0,-2))
    ori_left = parseInt(ori_left.slice(0,-2))
    ori_row = Math.round((ori_top-5)/60)
    ori_col = Math.round((ori_left-5)/60)

    console.log("Checking whether block is horizontal")

    // For horizontal blocks (vertical blocks have a different method)
    if (b.hasClass("block-hor")) {

        console.log("Block is horizontal")

        // Loop through the columns moving left, until you find a blocked one
        var left_point_found = 0
        var left_point = ori_col
        console.log(left_point)
        console.log(puzzle.gridState)
        while (left_point_found == 0) {
            if (puzzle.gridState[ori_row][left_point-1] == 1 || left_point == 0) {
                left_point_found = 1
            } else {
                left_point = left_point - 1
            }
        }
        // Loop through moving right, then add 1 to get the right edge
        var right_point_found = 0
        var right_point = ori_col + 1
        if (b.hasClass("block-size-3")) {right_point = right_point+1}
        while (right_point_found == 0) {
            if (puzzle.gridState[ori_row][right_point+1] == 1 || right_point == 5) {
                right_point_found = 1
            } else {
                right_point = right_point + 1
            }
        }
        right_point = right_point + 1

        // Create an element the shape of the left and right points

    }

}
