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
        title.text("Under the old bones you find a locked box and some stone tiles...")

        // Add the grid for the cars
        this.createGrid()

        // Grid of letters
        this.letterGrid = [["1","A","L","E","W"],
                            ["1","M","K","U","+"],
                            ["2","J","O","F","X"],
                            ["3","R","B","V","S"],
                            ["5","G","N","Z","T"],
                            ["8","C","H","Y","D"],
                            ["13","Q","I","","P"]]

        // Create a 'word'
        this.word = []

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

        // Append a table for the key
        canvas.append('<div class="sk-grid-wrapper pkey"></div>')
        $('.sk-grid-wrapper.pkey').append('<table class="table-fixed sk-grid pkey"></table')
        var tbody = $('.sk-grid.pkey')
        tbody.append('<tbody class="sk-grid-body pkey"></tbody>')
        // Append 4 rows
        for (var i=0; i<7; i++) {
            var trow = $('<tr class="sk-grid-row sk-grid-row-'+i+' pkey"></tr>')
            for (var j=0; j<5; j++) {
                var tcell = $('<td class="sk-grid-cell-outer sk-grid-col-'+i+' sk-grid-row-'+j+' pkey"></td>')
                var cell = $('<div class="sk-grid-cell-inner pkey"></div>')
                                .attr('data-grid-row',i)
                                .attr('data-grid-col',j)
                tcell.append(cell)
                trow.append(tcell)
            }
            tbody.append(trow)
        }

        // Append a table for the buttons
        canvas.append('<div class="sk-grid-wrapper ptile"></div>')
        $('.sk-grid-wrapper.ptile').append('<table class="table-fixed sk-grid ptile"></table')
        var tbody = $('.sk-grid.ptile')
        tbody.append('<tbody class="sk-grid-body ptile"></tbody>')
        // Append 4 rows
        for (var i=0; i<7; i++) {
            var trow = $('<tr class="sk-grid-row sk-grid-row-'+i+' ptile"></tr>')
            for (var j=0; j<5; j++) {
                var tcell = $('<td class="sk-grid-cell-outer sk-grid-col-'+i+' sk-grid-row-'+j+' ptile"></td>')
                var cell = $('<div class="sk-grid-cell-inner ptile"></div>')
                                .attr('data-grid-row',i)
                                .attr('data-grid-col',j)
                tcell.append(cell)
                trow.append(tcell)
            }
            tbody.append(trow)
        }

        // Append some text to the tiles
        $('.sk-grid-wrapper.pkey').append($('<span id="skeleton-clue-text-1">I am an odd number</span>'))
        $('.sk-grid-wrapper.pkey').append($('<span id="skeleton-clue-text-2">Take one away and I am even</span>'))
        $('.sk-grid-wrapper.ptile').append($('<span id="skeleton-output"></span>'))

        // Append the first and last rows of the key to the grid
        $('.sk-grid-row.sk-grid-row-0.pkey').append($('<img class="img-fluid tile-row tile-row-fixed" id="key-row-0" src=assets/images/minigames/puzzles/skeleton/key-line-1.bmp alt="Key Row">')
            .css({"top":"1px"})
            .css({"left":"4px"}))
        $('.sk-grid-row.sk-grid-row-6.pkey').append($('<img class="img-fluid tile-row tile-row-fixed" id="key-row-6" src=assets/images/minigames/puzzles/skeleton/key-line-7.bmp alt="Key Row">')
            .css({"top":"246px"})
            .css({"left":"4px"}))

        // On click method for when a cell is clicked
        $('.sk-grid-cell-outer.ptile').on("click",function(){
            // Get the row and column and convert to a letter
            var r = $(this).find('.sk-grid-cell-inner').attr('data-grid-row')
            var c = $(this).find('.sk-grid-cell-inner').attr('data-grid-col')
            var letter = self.letterGrid[r][c]
            // Add or remove the letter from the word
            if (letter == "") {
                self.word.pop()
            } else {
                self.word.push(letter)
            }

            // Make the word into a word
            var output = ''
            for (var n of self.word){
                output = output + n
            }

            // Write the word into the space
            $('#skeleton-output').text(output)

            // Add a check of whether the word is complete
            self.confirmComplete()
        })

    }

    // Function to check whether the password is complete
    confirmComplete(){

        console.log("Checking complete")
        console.log(this.word)

        // Check whether the password is correct
        var password = ["S","E","V","E","N"]
        if (JSON.stringify(this.word) == JSON.stringify(password)) {
            console.log("Password successful!")

            // Check whether the location is already open
            if (locations[puzzle.index].complete == 0) {

                // Show a dialogue modal, describing the entry opening
                $('#dialogue-modal').find('.modal-title').text('The box clicks open...')
                $('#dialogue-modal').modal('show')

                // Open the hiding place
                puzzle.openHidingPlace()

                // Mark puzle as complete
                locations[puzzle.index].complete = 1

            }

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
