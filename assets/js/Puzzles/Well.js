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

        // Add elements for all the icons
        var iconConifer = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-tree" id="icon-conifer"></span></div>')
        var iconScissors = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-cut" id="icon-scissors"></span></div>')
        var iconBell = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-bell" id="icon-bell"></span></div>')
        var iconCamera = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-camera" id="icon-camera"></span></div>')
        var iconFlag = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-flag" id="icon-flag"></span></div>')
        var iconHeadphones = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-headphones" id="icon-headphones"></span></div>')
        var iconCase = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-lock" id="icon-case"></span></div>')
        var iconClock = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-clock" id="icon-clock"></span></div>')
        var iconMusic = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-music" id="icon-music"></span></div>')
        var iconPencil = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-pen" id="icon-pencil"></span></div>')
        var iconEnvelope = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-envelope" id="icon-envelope"></span></div>')
        var iconHeart = $('<div class="well-icon-wrapper"><span class="well-icon fas fa-heart" id="icon-heart"></span></div>')

        // Create a list of all their icons and positions
        var iconsList = [{icon:iconConifer,col:0,row:0},
                        {icon:iconScissors,col:0,row:1},
                        {icon:iconBell,col:0,row:2},
                        {icon:iconCamera,col:0,row:3},
                        {icon:iconFlag,col:0,row:4},
                        {icon:iconHeadphones,col:0,row:5},
                        {icon:iconCase,col:0,row:6},
                        {icon:iconClock,col:0,row:7},
                        {icon:iconMusic,col:0,row:8},
                        {icon:iconPencil,col:0,row:9},
                        {icon:iconEnvelope,col:0,row:10},
                        {icon:iconHeart,col:0,row:11}
                        ]

        // Loop through all icons and add them 
        for (var icon of iconsList) {

            var iconRow = icon.row
            var iconCol = icon.col

            var stone = $('.well-grid-cell-wrapper[data-grid-row="'+icon.row+'"][data-grid-col="'+icon.col+'"]')

            stone.append(icon.icon)

        }

    }

    // Method for moving a stone's image 'in'
    moveStoneIn(stone){
        console.log("Moving stone")
        var stoneDepth = $(stone).attr('data-stone-clicked')
        var newStoneDepth = parseInt(stoneDepth) + 1
        if (newStoneDepth == 6) {newStoneDepth = 0}
        $(stone).empty()
        var newStone = $('<img class="img-fluid well-stone" src=assets/images/minigames/puzzles/well/well-stone-in'+newStoneDepth+'.jpg alt="Stone">')
        $(stone).append(newStone)
        $(stone).attr('data-stone-clicked',newStoneDepth)
    }

    // Method for checking whether the puzzle is complete (needs to be called after dragging events)
    checkComplete(){
    

    }

    // This method replaces the background with one with an open hiding space
    openHidingPlace(){


    }

}