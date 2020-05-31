// Minigame for the cave
class CavePuzzle{

    // Constructor adds all the elements
    constructor(index){

        $('#minigame-modal').attr('data-minigame-for',index)

        // Select the modal body for content (and empty both of them)
        var canvas = $('#minigame-modal').find('.modal-body').empty()
        var title = $('#minigame-modal').find('.modal-title').empty()

        // Add the the background and the title
        canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
        title.text("When you enter the cave, there are some strange icons carved into the floor, and several painted stones dotted around...")

        // Append a div for the cave paintings
        canvas.append($('<div class="click-region" id="cave-paintings"></div>')
                    .on("click",function(){
                        // Fill the zoom modal with the image and open it
                        zoom = new Zoom('assets/images/minigames/puzzles/cave/cave-paintings.png','zoomed-cave-paintings','They look like cave paintings',0)
                    })
                )

        // Append some spaces for the stones 
        var hollow1 = $('<div class="click-region hollow" id="hollow1"></div>')
        var hollow2 = $('<div class="click-region hollow" id="hollow2"></div>')
        var hollow3 = $('<div class="click-region hollow" id="hollow3"></div>')
        var hollow4 = $('<div class="click-region hollow" id="hollow4"></div>')
        canvas.append(hollow1).append(hollow2).append(hollow3).append(hollow4)

        // Append some stones 
        var stone1 = $('<img class="img-fluid click-region stone" id="stone_bug" src=assets/images/minigames/puzzles/cave/stone_bug.png alt="Stone1">')
        var stone2 = $('<img class="img-fluid click-region stone" id="stone_van" src=assets/images/minigames/puzzles/cave/stone_van.png alt="Stone2">')
        var stone3 = $('<img class="img-fluid click-region stone" id="stone_llama" src=assets/images/minigames/puzzles/cave/stone_llama.png alt="Stone3">')
        var stone4 = $('<img class="img-fluid click-region stone" id="stone_fin" src=assets/images/minigames/puzzles/cave/stone_fin.png alt="Stone4">')
        var stone5 = $('<img class="img-fluid click-region stone" id="stone_iron" src=assets/images/minigames/puzzles/cave/stone_iron.png alt="Stone5">')
        var stone6 = $('<img class="img-fluid click-region stone" id="stone_rat" src=assets/images/minigames/puzzles/cave/stone_rat.png alt="Stone6">')
        var stone7 = $('<img class="img-fluid click-region stone" id="stone_fez" src=assets/images/minigames/puzzles/cave/stone_fez.png alt="Stone7">')
        canvas.append(stone1).append(stone2).append(stone3).append(stone4).append(stone5).append(stone6).append(stone7)
        
        // Put the check of puzzle completion on all stones on mouseup (if the puzzle hasn't already been compeleted)
        if (locations[index].complete == 0) {
            $('#minigame-modal').on("mouseup",function(){puzzle.checkComplete()})
        }

        // Add jquery method to make the stones draggable
        $('.stone').draggable({
            // Keep them in the right window
            containment:$('#minigame-modal').find('.modal-body'),
            scroll:true,
            snap:'.hollow',
            snapMode:"inner",
            snapTolerance:"20"
        })

        //Add on click to the stones to make them zoomable
        $('.stone').on("click",function(){
            // Fill the zoom modal with the image and open it
            zoom = new Zoom('assets/images/minigames/puzzles/cave/'+this.id+'.png','zoomed-cave-stone','There are markings on the stones',0)
        })

        // Add on click to the hollows to give them an explanation dialogue
        $('.hollow').on("click",function(){
            $('#dialogue-modal').find('.modal-title').text('There are small depressions in the floor')
            $('#dialogue-modal').modal('show')    
        })

        // If the puzzle has been completed, show the opened hiding place
        if (locations[index].complete == 1) {
            this.openHidingPlace()
        }

        // Show the modal
        $('#minigame-modal').modal('show')

    }

    // Method for checking whether the puzzle is complete (needs to be called after dragging events)
    checkComplete(){

        console.log("Checking complete")

        // Not the neatest method....
        var obamax = parseInt($('#hollow1').css("left").slice(0,-2))
        var obamay = parseInt($('#hollow1').css("top").slice(0,-2))
        var llamax = parseInt($('#stone_llama').css("left").slice(0,-2))
        var llamay = parseInt($('#stone_llama').css("top").slice(0,-2))
        
        var tinx = parseInt($('#hollow2').css("left").slice(0,-2))
        var tiny = parseInt($('#hollow2').css("top").slice(0,-2))
        var finx = parseInt($('#stone_fin').css("left").slice(0,-2))
        var finy = parseInt($('#stone_fin').css("top").slice(0,-2))
        
        var catx = parseInt($('#hollow3').css("left").slice(0,-2))
        var caty = parseInt($('#hollow3').css("top").slice(0,-2))
        var ratx = parseInt($('#stone_rat').css("left").slice(0,-2))
        var raty = parseInt($('#stone_rat').css("top").slice(0,-2))
        
        var rugx = parseInt($('#hollow4').css("left").slice(0,-2))
        var rugy = parseInt($('#hollow4').css("top").slice(0,-2))
        var bugx = parseInt($('#stone_bug').css("left").slice(0,-2))
        var bugy = parseInt($('#stone_bug').css("top").slice(0,-2))
        
        var obamaOffsetX = (Math.abs(obamax - llamax))
        var obamaOffsetY = (Math.abs(obamay - llamay))
        var tinOffsetX = (Math.abs(tinx - finx))
        var tinOffsetY = (Math.abs(tiny - finy))
        var catOffsetX = (Math.abs(catx - ratx))
        var catOffsetY = (Math.abs(caty - raty))
        var rugOffsetX = (Math.abs(rugx - bugx))
        var rugOffsetY = (Math.abs(rugy - bugy))

        if (obamaOffsetX < 1 && obamaOffsetY < 1 && 
            tinOffsetX < 1 && tinOffsetY < 1 && 
            catOffsetX < 1 && catOffsetY < 1 && 
            rugOffsetX < 1 && rugOffsetY < 1) 
        {
            // Set the next hint to be the obelisk
            nextHint = 'travel_cave_obelisk' 

            // Mark puzzle as complete
            locations.find(function(entry){return entry.name=="Cave"}).complete = 1
            
            // Show a dialogue modal, describing the entry opening
            $('#dialogue-modal').find('.modal-title').text('A stone in the wall swings aside revealing two objects...')
            $('#dialogue-modal').modal('show')

            // Show the opened hiding place
            puzzle.openHidingPlace()
        } 

    }

    // This method replaces the background with one with an open hiding space
    openHidingPlace(){

        // Remove the on click method for checking completion
        $('#minigame-modal').off("mouseup")

        // Replace the background image with the door opened image
        $('#minigame-background').remove()
        $('#minigame-modal').find('.modal-body')                                
            .append('<img class="img-fluid" id="minigame-background" src=assets/images/minigames/cave_opened.png alt="Minigame">')

        // Add the two clues to the image
        //var clue1 = $('<img class="img-fluid" id="stepping-stones-clue" src=assets/images/clues/stepping-stones-clue.png alt="Clue1">')
        //            .on("click",function(){zoom = new Zoom('assets/images/clues/stepping-stones-clue.png','stepping-stones-clue','This must be some sort of hint',1)})
        var clue1 = $('<img class="img-fluid" id="obelisk-clue" src=assets/images/clues/obelisk-clue.jpg alt="Clue1">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/obelisk-clue.jpg','obelisk-clue','This must be a clue to the next location',1)})
        var clue2 = $('<img class="img-fluid" id="key-line-cave" src=assets/images/clues/key-line-cave.bmp alt="Clue2">')
                    .on("click",function(){zoom = new Zoom('assets/images/clues/key-line-cave.bmp','key-line-cave','A gold bar, stamped with characters',2)})
        $('#minigame-modal').find('.modal-body').append(clue1).append(clue2)
        
    }

}