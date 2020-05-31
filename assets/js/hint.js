
class Hint{

    constructor(){

        this.hintList = [
                            {hintGiven:0, signal:'travel_start_cave',        hint:"The villagers suggested you start at the caves on the beach.",
                                                                            solution:"Go back to the main map, and click on the picture labelled 'CAVE'."},
                            {hintGiven:0, signal:'lock_cave',                hint:"Do you still have the key the villagers gave you? Try looking in your inventory.",
                                                                            solution:"Click on the inventory, then click on the key and click 'Check'."},
                            {hintGiven:0, signal:'game_cave',                hint:"SOUNDS LIKE you need to put a stone in the hollow next to each of the pictures. Are there any links between them?",
                                                                            solution:"You're looking for four stones with images to rhyme with 'OBAMA','TIN','CAT', and 'RUG'."},
                            {hintGiven:0, signal:'travel_cave_obelisk',      hint:"You have what seems to be a cryptic clue to a location on the map. Try looking for an anagram?",
                                                                            solution:"OBELISK"},
                            {hintGiven:0, signal:'game_obelisk',             hint:"You'll need a closer look at those reddish stones - can you slide them across to the space on the right-hand side?",
                                                                            solution:"There's no trick here - keep trying..."},
                            {hintGiven:0, signal:'travel_obelisk_well',      hint:"'Life to the harshest of deserts' seems to imply water of some kind. Does anything on the map fit the clue?",
                                                                            solution:"WISHING WELL"},
                            {hintGiven:0, signal:'lock_well',                hint:"The combination lock needs four digits, in alternating directions - have you found a set of four numbers anywhere?",
                                                                            solution:"Turn the dial: anti-clockwise to 18, clockwise to 10, anti-clockwise to 29, clockwise to 25, then click 'check'."},
                            {hintGiven:0, signal:'game_well',                hint:"The clue from the obelisk has some symbols that match the symbols on the wall. Is there anything special about the symbols that are missing?",
                                                                            solution:"Clicking on the stones of the wall slides them in. The blocks in the positions of the five unmatched symbols need to be pushed in 'N' times, where 'N' is related to the symbol. Once: The Eye (I), Twice: The Eyes (II),  Three Times: The Aye-Aye's Eye (III), Four Times: The Ivy (IV), Five Times: The V-Neck T-shirt (V)."},
                            {hintGiven:0, signal:'travel_well_volcano',      hint:"Try to find letters that match each of the lines. Can you see a location on the map that you wouldn't want to wake up?",
                                                                            solution:"VOLCANO"},
                            {hintGiven:0, signal:'game_volcano',             hint:"Any open-ended pipes will allow the lava to spill out. Can you turn them all so that there are no lose ends?",
                                                                            solution:"There's no easy solution here - try starting from the edges and working inwards. The lava cannot be allowed to flow out of the sides, which defines some of the pipes' positions."},
                            {hintGiven:0, signal:'travel_volcano_waterfall', hint:"You have what sounds like a poetic description of another place on the map.",
                                                                            solution:"WATERFALL"},
                            {hintGiven:0, signal:'lock_waterfall',           hint:"You'll need to click on the stepping stones you want to step on. Make sure not to click on the wrong ones. Use the reset button to go back to the start if you need to.",
                                                                            solution:"The dangerous stones are marked on the diagram you collected earlier."},
                            {hintGiven:0, signal:'game_waterfall',           hint:"The scales will open if you can put exactly 4kg on them.",
                                                                            solution:"Fill the larger jug. Pour from the larger jug into the smaller, then empty out the smaller. Pour the remaining contents of the larger jug into the smaller again. Finally, fill the larger jug, pour it into the smaller, and weigh the larger jug."},
                            {hintGiven:0, signal:'travel_waterfall_skeleton',hint:"Try and find letters that match each of the lines of your clue. Once you find the word, look for a location on the map that matches.",
                                                                            solution:"SKELETON"},
                            {hintGiven:0, signal:'game_skeleton',            hint:"Try adding the tiles you've collected to the grid on the lid of the chest. Then maybe you can use the other grid to type.",
                                                                            solution:"Arrange the gold tiles in number order on the left hand side. Then mapping the letters across, use the right hand grid to type 'SEVEN'."},
                            {hintGiven:0, signal:'travel_skeleton_end',      hint:"You'll need to take the artefact back to the village.",
                                                                            solution:"Go back to the village, and click on the artefact in your inventory."}
                        ]

    }

    // Get the hint modal title, fill it with the hint, then show the modal
    giveHint(){

        // Copy the class instance for jquery purposes
        var self = this

        // Find the hint jobject that matches the hint
        var hId = self.hintList.findIndex(function(entry){
            return entry.signal == nextHint
        }) 

        // Get the hint entry
        var hEntry = self.hintList[hId]

        // Mark the hint as given (can count them later)
        self.hintList[hId].hintGiven = 1

        // Put the hint and solution (redacted) into the modal with on click method to show the solution
        var hintSpace = $('#hint-modal').find('.modal-title')
        hintSpace.text(hEntry.hint)
        var solutionSpace = $('#hint-modal').find('.modal-body').find('.solution')
        solutionSpace.text(hEntry.solution)
                    .css({"background-color":"#212529"})
        solutionSpace.on("click",function(){
            $(this).css({"background-color":"#B3FFFF"})
        })

        // Show the modal
        $('#hint-modal').modal('show')

    }

}

// On click method for showing the hint
function showHint(){

    hint.giveHint()

}