
// Each minigame is its own class. The constructor needs to create the modal for it
class Minigame{

    // Constructor
    constructor(index){
  
        // Add the main elements of each game
        switch(index){
            case 0:
                puzzle = new CavePuzzle(index)
                break;
            default:
                break;
        } 

    }

}