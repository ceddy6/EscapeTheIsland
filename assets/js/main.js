// List of locations and the player should be available everywhere
var locationsList = [{name:"Camp",position:["50%","69%"]},
                    {name:"Port du Moulin",position:["38%","55%"]},
                    {name:"Clos de Menage",position:["47%","72%"]},
                    {name:"Port Gorey",position:["80%","10%"]},
                    {name:"Creux Harbour",position:["66%","85%"]},
                    ]
var locations
var player

//Wrap the construction in a ready function
$(function(){

    //Run the location creator to instantiate locations
    locations = []
    for (i=0;i<locationsList.length;i++) {
        locations.push(new Location(i))
    }  

    //Run the location creator to instantiate locations
    player = new Player(1)

})


function locationClicked(index) {

    player.goToLocation(index)

}