
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
            case 4:
                puzzle = new VolcanoPuzzle(index)
                break;
            case 5:
                puzzle = new SkeletonPuzzle(index)
                break;
            case 6:
                // If we go back to the village, will need to open the village, and then somehow open the inventory to allow completion
                var canvas = $('#minigame-modal').find('.modal-body').empty()
                var title = $('#minigame-modal').find('.modal-title').empty()
                $('#minigame-modal').attr('data-minigame-for',index)
                canvas.append('<img class="img-fluid in-village" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
                title.text("Back in the village, there are some expectant looks... Do you have the artefact?")
                $('#minigame-modal').modal('show')
                break;
            default:
                // If there isn't a real puzzle at the location, show 'no puzzle here' messages
                var canvas = $('#minigame-modal').find('.modal-body').empty()
                var title = $('#minigame-modal').find('.modal-title').empty()
                $('#minigame-modal').attr('data-minigame-for',10)
                canvas.append('<img class="img-fluid" id="minigame-background" src='+locations[index].minigame_img+' alt="Minigame">')
                title.text("There doesn't seem to be anything here... Could you be in the wrong place?")
                $('#minigame-modal').modal('show')
                break;
        } 

    }

}