
// Each minigame is its own class. The constructor needs to create the modal for it
class Minigame{

    // Constructor
    constructor(index){
  
        // Add the main elements of each game
        switch(index){
            case 0:
                puzzle = new CavePuzzle(index)
                break;
            case 1: 
                puzzle = new WaterfallPuzzle(index)
                break;
            case 2: 
                puzzle = new WellPuzzle(index)
                break;
            case 3:
                puzzle = new ObeliskPuzzle(index)
                break;
            default:
                break;
        } 

    }

}