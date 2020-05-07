// Minigame for the cave
class ObeliskPuzzle{

    // Constructor adds all the elements
    constructor(index){

        // Select the modal body for content (and empty both of them)
        var canvas = $('#minigame-modal').find('.modal-body').empty()
        var title = $('#minigame-modal').find('.modal-title').empty()

        // Add the the background and the title
        canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        title.text("One of these stones looks a different shade...")

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

        // Add cars ([row,col], 0-indexed)
        var b0 = new Block(this,2,"hor",[2,1],0)
        var b1 = new Block(this,2,"ver",[0,1],1)
        var b2 = new Block(this,2,"ver",[3,2],2)
        var b3 = new Block(this,2,"ver",[1,3],3)
        var b4 = new Block(this,2,"ver",[1,5],4)
        var b5 = new Block(this,2,"ver",[4,5],5)
        var b6 = new Block(this,2,"hor",[4,3],6)
        var b7 = new Block(this,3,"ver",[1,0],7)
        var b8 = new Block(this,3,"hor",[0,3],8)
        var b9 = new Block(this,3,"hor",[3,3],9)
        var b10 = new Block(this,1,"hor",[5,0],10)

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
    constructor(puzzle,size,orientation,position,num){

        console.log("Creating block: " + num)

        var blockSize = 60
        var margin = 5

        // Create a block div
        var block = $('<div class="block" id="block-'+num+'"></div>')
                    .attr("data-num",num)
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

        // Block 10 isn't draggable
        if (num != 10) {

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
        }

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
            if ($(this).attr("data-num") != 10) {
                puzzle.gridState[row][col+1] = 1
                if ($(this).hasClass("block-size-3")) {
                    puzzle.gridState[row][col+2] = 1
                }
            }
        } else {
            if ($(this).attr("data-num") != 10) {
                puzzle.gridState[row+1][col] = 1
                if ($(this).hasClass("block-size-3")) {
                    puzzle.gridState[row+2][col] = 1
                }
            }   
        }

    })

    // Create a limiting block for each of the blocks
    calculateConstraints(puzzle)

}

// Function creates a constraint block for each of the blocks based on the grid in use
function calculateConstraints(puzzle) {

    console.log("Calculating constraints")

    // Grab a list of all the blocks
    var blockList = $('.block')

    // Loop through all the blocks 
    blockList.each(function(){

        // Get the number of the block
        var n = $(this).attr("data-num")

        // Get the origin row and column of the block
        var ori_left = $(this).css("left")
        var ori_top = $(this).css("top")
        ori_top2 = parseInt(ori_top.slice(0,-2))
        ori_left2 = parseInt(ori_left.slice(0,-2))
        ori_row = Math.round((ori_top2-5)/60)
        ori_col = Math.round((ori_left2-5)/60)

        // For horizontal blocks (vertical blocks have a different method)
        if ($(this).hasClass("block-hor")) {

            // Loop through the columns moving left, until you find a blocked one
            var left_point_found = 0
            var left_point = ori_col
            while (left_point_found == 0) {
                if (left_point - 1 >= 0) {
                    if (puzzle.gridState[ori_row][left_point-1] == 1 || left_point == 0) {
                        left_point_found = 1
                    } else {
                        left_point = left_point - 1
                    }
                } else {
                    left_point = 0
                    left_point_found = 1
                }
            }
            // Loop through moving right, then add 1 to get the right edge
            var right_point_found = 0
            var right_point = ori_col + 1
            if ($(this).hasClass("block-size-3")) {right_point = right_point+1}
            while (right_point_found == 0) {
                if (right_point + 1 <= 5) {
                    if (puzzle.gridState[ori_row][right_point+1] == 1 || right_point == 5) {
                        right_point_found = 1
                    } else {
                        right_point = right_point + 1
                    }
                } else {
                    right_point = 5
                    right_point_found = 1
                }
            }
            right_point = Math.min(right_point + 1,6)
            var divWidth = (right_point - left_point)*60

            // Create an element the shape of the left and right points
            var wrapDiv = $('<div class="wrap-constraint wrap-constraint-'+n+'"></div>')
                    .css({"width":divWidth})
                    .css({"height":"60px"})
                    .css({"top":(ori_top2-5)+"px"})
                    .css({"left":(left_point*60)+"px"})

            // Append the div to the grid
            $('#ob-grid-body').append(wrapDiv)

        } else {

            // Loop through the rows moving up, until you find a blocked one
            var top_point_found = 0
            var top_point = ori_row
            while (top_point_found == 0) {
                if (top_point - 1 >= 0) {
                    if (puzzle.gridState[top_point-1][ori_col] == 1 || top_point == 0) {
                        top_point_found = 1
                    } else {
                        top_point = top_point - 1
                    }
                } else {
                    top_point = 0
                    top_point_found = 1
                }
            }
            // Loop through moving down, then add 1 to get the bottom edge
            var low_point_found = 0
            var low_point = ori_row + 1
            if ($(this).hasClass("block-size-3")) {low_point = low_point+1}
            while (low_point_found == 0) {
                if (low_point + 1 <= 5) {
                    if (puzzle.gridState[low_point+1][ori_col] == 1 || low_point == 5) {
                        low_point_found = 1
                    } else {
                        low_point = low_point + 1
                    }
                } else {
                    low_point = 5
                    low_point_found = 1
                }
            }
            low_point = Math.min(low_point + 1,6)
            var divHeight = (low_point - top_point)*60

            // Create an element the shape of the left and right points
            var wrapDiv = $('<div class="wrap-constraint wrap-constraint-'+n+'"></div>')
                    .css({"width":"60px"})
                    .css({"height":divHeight})
                    .css({"top":(top_point*60)+"px"})
                    .css({"left":(ori_left2-5)+"px"})

        }

        // Append the div to the grid
        $('.wrap-constraint-'+n).remove()
        $('#ob-grid-body').append(wrapDiv)

        // Apply draggable
        applyDraggable()

    })

}

// Function to apply draggable (with appropriate constraint) to each block
function applyDraggable(){

    console.log("Applying draggable")

    // Loop through all the blocks. Remove the existing draggable and reapply it
    for (b = 0; b<=9; b++) {

        // Select the block
        var block = $('#block-'+b)

        // Check whether the orientation is horizontal or vertical
        if (block.hasClass("block-hor")) {
            var axis = "x"
        } else {
            var axis = "y"
        }

        // Apply the correct draggable
        block.draggable({
            containment:$('.wrap-constraint-'+b),
            snap:'.ob-grid-cell-inner',
            snapMode:"inner",
            snapTolerance:"30",
            axis:axis
        })

    }

}
