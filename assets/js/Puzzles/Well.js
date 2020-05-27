// Minigame for the cave
class WellPuzzle{

    // Constructor adds all the elements
    constructor(index){

        // Set the id for later access
        this.index = index

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

        var self = this

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
                var cell = $('<div class="well-grid-cell-wrapper"></div>')
                                .attr('data-grid-row',i)
                                .attr('data-grid-col',j)
                                .attr('data-stone-clicked',0)
                var stone = $('<img class="img-fluid well-stone" src=assets/images/minigames/puzzles/well/well-stone-in0.jpg alt="Stone">')
                cell.append(stone)
                tcell.append(cell)
                trow.append(tcell)
            }
            tbody.append(trow)
        }

        // Add an on-click method for each cell, to move the stone in on click
        $('.well-grid-cell-wrapper').on("click",function(){self.moveStoneIn(this)})

        // Add icons to the stones
        this.addIcons()

    }

    // Method for applying icons to the labels
    addIcons(){

        // Icon sizes make the icon smaller as the stone moves in
        this.iconSizes = ['32px','30px','28px','26px','24px','22px']

        // Add elements for all the icons
        var iconConifer = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-tree" id="icon-conifer"></span></div>')
        var iconScissors = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-cut" id="icon-scissors"></span></div>')
        var iconBell = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-bell" id="icon-bell"></span></div>')
        var iconCamera = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-camera" id="icon-camera"></span></div>')
        var iconFlag = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-flag" id="icon-flag"></span></div>')
        var iconHeadphones = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-headphones" id="icon-headphones"></span></div>')
        var iconSuitcase = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-lock" id="icon-suitcase"></span></div>')
        var iconClock = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-clock" id="icon-clock"></span></div>')
        var iconMusic = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-music" id="icon-music"></span></div>')
        var iconPencil = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-pen" id="icon-pencil"></span></div>')
        var iconEnvelope = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-envelope" id="icon-envelope"></span></div>')
        var iconHeart = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-heart" id="icon-heart"></span></div>')

        // Create a list of all their icons and positions
        this.iconsList = [{icon:iconConifer,id:"icon-conifer",      col:1,row:51},
                        {icon:iconScissors,id:"icon-scissors",      col:3,row:7},
                        {icon:iconBell,id:"icon-bell",              col:1,row:49},
                        {icon:iconCamera,id:"icon-camera",          col:4,row:36},
                        {icon:iconFlag,id:"icon-flag",              col:0,row:30},
                        {icon:iconHeadphones,id:"icon-headphones",  col:3,row:59},
                        {icon:iconSuitcase,id:"icon-suitcase",      col:2,row:26},
                        {icon:iconClock,id:"icon-clock",            col:0,row:13},
                        {icon:iconMusic,id:"icon-music",            col:1,row:73},
                        {icon:iconPencil,id:"icon-pencil",          col:1,row:74},
                        {icon:iconEnvelope,id:"icon-envelope",      col:4,row:55},
                        {icon:iconHeart,id:"icon-heart",            col:0,row:67}
                        ]

        // Loop through all icons and add them 
        for (var icon of this.iconsList) {

            // Get the row and column to add it to from the list of icons
            var iconRow = icon.row
            var iconCol = icon.col

            // Select the right stone
            var stone = $('.well-grid-cell-wrapper[data-grid-row="'+icon.row+'"][data-grid-col="'+icon.col+'"]')

            // Append the icon to the stone
            stone.append(icon.icon)
        
            // Set the font size of the icons
            $('.well-icon').css({"font-size":"32px"})

        }

    }

    // Method for moving a stone's image 'in'
    moveStoneIn(stone){

        // Get the stone's depth, row and column
        var stoneDepth = $(stone).attr('data-stone-clicked')
        var stoneRow = $(stone).attr('data-grid-row')
        var stoneCol = $(stone).attr('data-grid-col')

        // Get the icon by searching the list
        var stoneIcon = puzzle.iconsList.find(function(entry){
            return entry.row == stoneRow && entry.col == stoneCol
        })

        // Update the depth
        var newStoneDepth = parseInt(stoneDepth) + 1
        if (newStoneDepth == 6) {newStoneDepth = 0}

        // Update the stone, add the new icon
        $(stone).empty()
        var newStone = $('<img class="img-fluid well-stone" src=assets/images/minigames/puzzles/well/well-stone-in'+newStoneDepth+'.jpg alt="Stone">')
        $(stone).append(newStone)
        $(stone).attr('data-stone-clicked',newStoneDepth)

        // If the stone has an icon, add it
        if (stoneIcon) {
            var newIcon = stoneIcon.icon
            $(stone).append(newIcon)

            // Update the font size of the icon
            $('#'+stoneIcon.id).css({"font-size":puzzle.iconSizes[parseInt(newStoneDepth)]})
        }

        // Whenever you move a stone in, check for completion
        this.checkComplete()

    }

    // Method for checking whether the puzzle is complete (needs to be called after dragging events)
    checkComplete(){

        console.log("Checking stones")

        // Get the depth of the five stones
        var stone1Depth = $('.well-grid-cell-wrapper[data-grid-row=6][data-grid-col=2]').attr('data-stone-clicked')
        var stone2Depth = $('.well-grid-cell-wrapper[data-grid-row=28][data-grid-col=1]').attr('data-stone-clicked')
        var stone3Depth = $('.well-grid-cell-wrapper[data-grid-row=46][data-grid-col=1]').attr('data-stone-clicked')
        var stone4Depth = $('.well-grid-cell-wrapper[data-grid-row=50][data-grid-col=0]').attr('data-stone-clicked')
        var stone5Depth = $('.well-grid-cell-wrapper[data-grid-row=67][data-grid-col=4]').attr('data-stone-clicked')
        // Use these if you want a quick test
        var tstone1Depth = $('.well-grid-cell-wrapper[data-grid-row="0"][data-grid-col="0"]').attr('data-stone-clicked')
        var tstone2Depth = $('.well-grid-cell-wrapper[data-grid-row="0"][data-grid-col="1"]').attr('data-stone-clicked')
        var tstone3Depth = $('.well-grid-cell-wrapper[data-grid-row="0"][data-grid-col="2"]').attr('data-stone-clicked')
        var tstone4Depth = $('.well-grid-cell-wrapper[data-grid-row="0"][data-grid-col="3"]').attr('data-stone-clicked')
        var tstone5Depth = $('.well-grid-cell-wrapper[data-grid-row="0"][data-grid-col="4"]').attr('data-stone-clicked')

        // Compare the depths to the targets
        // Real checks
        if ((parseInt(stone1Depth) == 1) &&
           (parseInt(stone2Depth) == 2) &&
           (parseInt(stone3Depth) == 3) &&
           (parseInt(stone4Depth) == 4) &&
           (parseInt(stone5Depth) == 5)) {
        // End of real checks

        // Testing checks
        //if ((parseInt(tstone1Depth) == 1) &&
        //    (parseInt(tstone2Depth) == 2)) {
        // End of testing checks

                console.log("All the tests were passed!")

                // Set a timeout so that you can see the stone finish
                setTimeout(function(){
                    // Show a dialogue modal, describing the entry opening
                    $('#dialogue-modal').find('.modal-title').text('The fifth stone slides back into the wall...')
                    $('#dialogue-modal').modal('show')
                    // Show the updated background and clues
                    puzzle.openHidingPlace()
                },1000)
        } 

    }

    // This method replaces the background with one with an open hiding space
    openHidingPlace(){

        // Turn off the stone on-click method
        $('.well-grid-cell-wrapper').off("click")

        // Append a black div to the fifth stone
        $('.well-grid-cell-wrapper[data-grid-row="67"][data-grid-col="4"]')
            .empty()
            .append('<div class="well-stone" id="black-well-stone"></div>')

        // Append the clues
        var clue1 = $('<img class="img-fluid" id="volcano-clue" src=assets/images/clues/volcano-clue.jpg alt="Clue1">')
                .on("click",function(){zoom = new Zoom('assets/images/clues/volcano-clue.jpg','volcano-clue','A clue!',1)})
        var clue2 = $('<img class="img-fluid" id="key-line-well" src=assets/images/clues/key-line-well.bmp alt="Clue2">')
                .on("click",function(){zoom = new Zoom('assets/images/clues/key-line-well.bmp','key-line-well','Another of those gold bars',2)})
        $('.well-grid-cell-wrapper[data-grid-row="67"][data-grid-col="4"]').append(clue1).append(clue2)

    }

    appendClue(){

        console.log("Appending clue in the puzzle")

        // Get the canvas to work on
        var canvas = $('#minigame-modal').find('.modal-body')
        canvas.append('<div class="well-grid-wrapper-clue"></div>')
        $('.well-grid-wrapper-clue').append('<div id="well-stones-appended-clue-wrapper"></div>')
        $('#well-stones-appended-clue-wrapper').append('<img class="img-fluid" id="well-stones-appended-clue" src=assets/images/clues/well-stones-clue.jpg alt="Clue">')

    }

}