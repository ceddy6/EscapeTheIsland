// Minigame for the cave
class CavePuzzle{

    // Constructor adds all the elements
    constructor(){

        // Select the modal body for content
        var canvas = $('#minigame-modal').find('.modal-body')

        // Append a div for the cave paintings
        canvas.append($('<div class="click-region" id="cave-paintings"></div>')
                    .on("click",function(){
                        // Fill the zoom modal with the image and open it
                        var zoom = $('#zoom-modal')
                        zoom.find('.modal-title').text("They look like cave paintings")  
                        zoom.find('.modal-body').empty()
                                                .append('<img class="img-fluid" id="zoomed-cave-paintings" src=assets/images/minigames/puzzles/cave/cave-paintings.bmp alt="Cave Paintings">')
                        zoom.modal('show')
                    })
                )

        // Append some stones 
        var stone1 = $('<div class="click-region stone" id="stone1"></div>')
        var stone2 = $('<div class="click-region stone" id="stone2"></div>')
        var stone3 = $('<div class="click-region stone" id="stone3"></div>')
        var stone4 = $('<div class="click-region stone" id="stone4"></div>')
        canvas.append(stone1).append(stone2).append(stone3).append(stone4)

        // Make the stones elements draggable:
        dragElement($("#stone1")[0])
        dragElement($("#stone2")[0])
        dragElement($("#stone3")[0])
        dragElement($("#stone4")[0])

    }

}