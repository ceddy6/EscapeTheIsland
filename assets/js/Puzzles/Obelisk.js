// Minigame for the cave
class ObeliskPuzzle{

    // Constructor adds all the elements
    constructor(index){

        this.index = index

        // Select the modal body for content (and empty both of them)
        var canvas = $('#minigame-modal').find('.modal-body').empty()
        var title = $('#minigame-modal').find('.modal-title').empty()

        // Add the the background and the title
        canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        title.text("Arriving at the Obelisk, you notice a couple of the stones look a different shade.")

        // Add the grid for the cars
        this.createGrid(1)
        this.createGrid(2)

        // On and off grid for squares
        this.gridState = [[  
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0]
                        ],
                        [  
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0],
                            [0,0,0,0,0,0]
                        ]]

        // Add cars ([row,col], 0-indexed)
        // Inputs are (this,size,orientation,topleft starting coordinates,blockid,puzzleid,fixed)
        var b0 = new Block(this,2,"hor",[2,0],0,1,0)
        var b1 = new Block(this,2,"hor",[3,3],1,1,0)
        var b2 = new Block(this,2,"ver",[2,2],2,1,0)
        var b3 = new Block(this,2,"ver",[1,3],3,1,0)
        var b4 = new Block(this,2,"ver",[1,5],4,1,0)
        var b5 = new Block(this,3,"hor",[0,3],5,1,0)
        var b6 = new Block(this,3,"hor",[5,1],6,1,0)
        var b7 = new Block(this,3,"ver",[3,0],7,1,0)
        var b8 = new Block(this,3,"ver",[3,5],8,1,0)
        var b9 = new Block(this,1,"hor",[0,1],9,1,1)
        var b10 = new Block(this,1,"hor",[1,2],10,1,1)

        var b0 = new Block(this,2,"hor",[2,1],0,2,0)
        var b1 = new Block(this,2,"ver",[0,1],1,2,0)
        var b2 = new Block(this,2,"ver",[3,2],2,2,0)
        var b3 = new Block(this,2,"ver",[1,3],3,2,0)
        var b4 = new Block(this,2,"ver",[1,5],4,2,0)
        var b5 = new Block(this,2,"ver",[4,5],5,2,0)
        var b6 = new Block(this,2,"hor",[4,3],6,2,0)
        var b7 = new Block(this,3,"ver",[1,0],7,2,0)
        var b8 = new Block(this,3,"hor",[0,3],8,2,0)
        var b9 = new Block(this,3,"hor",[3,3],9,2,0)
        var b10 = new Block(this,1,"hor",[5,0],10,2,1)

        // If the puzzle has been completed, show the opened hiding place
        for (var p = 1; p<=2; p++) {
            if (locations[index].complete[p-1] == 1) {
                this.openHidingPlace(p)
            }
        }   

        // Call the function to update the grid state
        updateGridState(this,1)
        updateGridState(this,2)

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
    openHidingPlace(puzzid){

        // Append a black div to the main block
        var hollowBlock = $('<div class="hollowBlock puzzle-'+puzzid+'"></div>')
        $('.block-0.puzzle-'+puzzid).append(hollowBlock)

        // Append the clues
        if (puzzid == 1) {
            var clue1 = $('<img class="img-fluid" id="well-clue" src=assets/images/clues/well-clue.jpg alt="Clue1">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/well-clue.jpg','well-clue','This must be a clue to the next location',1)})
            var clue4 = $('<img class="img-fluid" id="diallock-clue" src=assets/images/clues/diallock-clue.jpg alt="Clue4">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/diallock-clue.jpg','diallock-clue','Some cryptic symbols',1)})
            $('.block-0.puzzle-1').append(clue1).append(clue4)
        }
        if (puzzid == 2) {
            var clue2 = $('<img class="img-fluid" id="well-stones-clue" src=assets/images/clues/well-stones-clue.jpg alt="Clue2">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/well-stones-clue.jpg','well-stones-clue','This must be some sort of clue...',1)})
            var clue3 = $('<img class="img-fluid" id="key-line-obelisk" src=assets/images/clues/key-line-obelisk.bmp alt="Clue3">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/key-line-obelisk.bmp','key-line-obelisk','Another of those gold bars',2)})
            $('.block-0.puzzle-2').append(clue2).append(clue3)
        }

    }

}

// Class for blocks that can move on the grid
class Block{

    // Constructor
    constructor(puzzle,size,orientation,position,num,puzzid,blockfixed){

        //console.log("Creating block: " + num)

        var blockSize = 60
        var margin = 0

        // Create a block div
        var block = $('<div class="block block-'+num+' puzzle-'+puzzid+'"></div>')
                    .attr("data-num",num)
                    .attr("data-block-draggable",1-blockfixed)
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
        $('.ob-grid-body.puzzle-'+puzzid).append(block)

        // Block 10 isn't draggable
        if (blockfixed == 0) {

            // Make the block draggable
            block.draggable({
                // Keep them in the right window
                containment:$('#minigame-modal').find('.ob-grid-wrapper.puzzle-'+puzzid),
                snap:'.ob-grid-cell-inner.puzzle-'+puzzid,
                snapMode:"inner",
                snapTolerance:"30",
                axis:axis
            })

            // Update the grid on mouseup
            $(window).on("mouseup",function(){
                updateGridState(puzzle,puzzid)
                checkPuzzleCompletion(puzzid)
            })
        }

        // Starting positions for the blocks
        block.css({"top":(position[0]*blockSize+margin) + "px"})
            .css({"left":(position[1]*blockSize+margin) + "px"})

    }

}

// Function to maintain a grid with the state of the puzzle
function updateGridState(puzzle,puzzid){
    
    //console.log("Updating grid state!")

    // On and off grid for squares (set all to 0)
    puzzle.gridState[puzzid-1] = [  
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ]

    //Select the block
    var blockList = $('.block.puzzle-'+puzzid)

    blockList.each(function(){

        // Get its position and convert to coordinates
        var top = $(this).css("top")
        var left = $(this).css("left")
        top = parseInt(top.slice(0,-2))
        left = parseInt(left.slice(0,-2))
        row = Math.round((top-5)/60)
        col = Math.round((left-5)/60)

        // Add the 1 to the state
        puzzle.gridState[puzzid-1][row][col] = 1

        // Find out whether it's vertical or horizontal, and how big it is, and add ones as needed
        if ($(this).hasClass("block-hor")) {
            if ($(this).hasClass("block-size-2") || $(this).hasClass("block-size-3")) {
                puzzle.gridState[puzzid-1][row][col+1] = 1
                if ($(this).hasClass("block-size-3")) {
                    puzzle.gridState[puzzid-1][row][col+2] = 1
                }
            }
        } else {
            if ($(this).hasClass("block-size-2") || $(this).hasClass("block-size-3")) {
                puzzle.gridState[puzzid-1][row+1][col] = 1
                if ($(this).hasClass("block-size-3")) {
                    puzzle.gridState[puzzid-1][row+2][col] = 1
                }
            }   
        }

    })

    // Create a limiting block for each of the blocks
    calculateConstraints(puzzle,puzzid)

}

// Function creates a constraint block for each of the blocks based on the grid in use
function calculateConstraints(puzzle,puzzid) {

    //console.log("Calculating constraints")

    // Grab a list of all the blocks
    var blockList = $('.block.puzzle-'+puzzid)

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
                    if (puzzle.gridState[puzzid-1][ori_row][left_point-1] == 1 || left_point == 0) {
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
                    if (puzzle.gridState[puzzid-1][ori_row][right_point+1] == 1 || right_point == 5) {
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
            // If the block is the key block and the right point includes the edge, extend it
            if (n == 0 && right_point == 6) {
                right_point = 8
            }
            var divWidth = (right_point - left_point)*60

            // Create an element the shape of the left and right points
            var wrapDiv = $('<div class="wrap-constraint wrap-constraint-'+n+' puzzle-'+puzzid+'"></div>')
                    .css({"width":divWidth})
                    .css({"height":"60px"})
                    .css({"top":(ori_top2-5)+"px"})
                    .css({"left":(left_point*60)+"px"})

        } else {

            // Loop through the rows moving up, until you find a blocked one
            var top_point_found = 0
            var top_point = ori_row
            while (top_point_found == 0) {
                if (top_point - 1 >= 0) {
                    if (puzzle.gridState[puzzid-1][top_point-1][ori_col] == 1 || top_point == 0) {
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
                    if (puzzle.gridState[puzzid-1][low_point+1][ori_col] == 1 || low_point == 5) {
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
            var wrapDiv = $('<div class="wrap-constraint wrap-constraint-'+n+' puzzle-'+puzzid+'"></div>')
                    .css({"width":"60px"})
                    .css({"height":divHeight})
                    .css({"top":(top_point*60)+"px"})
                    .css({"left":(ori_left2-5)+"px"})

        }

        // Append the div to the grid
        $('.wrap-constraint-'+n+'.puzzle-'+puzzid).remove()
        $('.ob-grid-body.puzzle-'+puzzid).append(wrapDiv)

        // Apply draggable
        applyDraggable(puzzid)

    })

}

// Function to apply draggable (with appropriate constraint) to each block
function applyDraggable(puzzid){

    //console.log("Applying draggable")
    var blockList = $('.block.puzzle-'+puzzid)

    // Loop through all the blocks. Remove the existing draggable and reapply it
    blockList.each(function(){

        var n = $(this).attr("data-num")

        if ($(this).attr("data-block-draggable") == 1) {

            // Check whether the orientation is horizontal or vertical
            if ($(this).hasClass("block-hor")) {
                var axis = "x"
            } else {
                var axis = "y"
            }

            // Apply the correct draggable
            $(this).draggable({
                containment:$('.wrap-constraint-'+n+'.puzzle-'+puzzid),
                snap:'.ob-grid-cell-inner.puzzle-'+puzzid,
                snapMode:"inner",
                snapTolerance:"30",
                axis:axis
            })
        }

    })

}

// Check whether the important block has reached the edge
function checkPuzzleCompletion(puzzid){

    //console.log("Checking puzzle completion")
    var block = $('.block-0.puzzle-'+puzzid)
    var l = block.position().left
    // If it's further right than the grid edge, the puzzle is complete
    if (l > 310) {

        // Check whether the location is already open
        if (locations[puzzle.index].complete[puzzid-1] == 0) {

            // Show a dialogue modal, describing the entry opening
            $('#dialogue-modal').find('.modal-title').text('The back of the block is hollow...')
            $('#dialogue-modal').modal('show')

            // Open the hiding place
            puzzle.openHidingPlace(puzzid)

            // Mark puzle as complete
            locations[puzzle.index].complete[puzzid-1] = 1

            // Stop checking for completion if both puzzles are complete
            if (locations[puzzle.index].complete[0] == 1 && locations[puzzle.index].complete[1] == 1) {
                $(window).off("mouseup")
            }

        }
    }

}
