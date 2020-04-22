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

        // Append some spaces for the stones 
        var hollow1 = $('<div class="click-region hollow" id="hollow1"></div>')
        var hollow2 = $('<div class="click-region hollow" id="hollow2"></div>')
        var hollow3 = $('<div class="click-region hollow" id="hollow3"></div>')
        var hollow4 = $('<div class="click-region hollow" id="hollow4"></div>')
        canvas.append(hollow1).append(hollow2).append(hollow3).append(hollow4)

        // Append some stones 
        var stone1 = $('<div class="click-region stone" id="stone1"></div>')
        var stone2 = $('<div class="click-region stone" id="stone2"></div>')
        var stone3 = $('<div class="click-region stone" id="stone3"></div>')
        var stone4 = $('<div class="click-region stone" id="stone4"></div>')
        canvas.append(stone1).append(stone2).append(stone3).append(stone4)
      
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
            var zoom = $('#zoom-modal')
            zoom.find('.modal-title').text("There are markings on the stones") 
            zoom.find('.modal-body').empty()
                .append('<img class="img-fluid" id="zoomed-cave-stone" src=assets/images/minigames/puzzles/cave/'+this.id+'.bmp alt="Cave Stones">')
            zoom.modal('show')
        })

    }

}