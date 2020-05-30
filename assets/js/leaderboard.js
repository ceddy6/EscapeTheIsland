
class Leaderboard {

    constructor () {

        // Run the population function at creation
        this.populateLeaderboard()

    }

    // Leaderboard has a method to populate itself
    populateLeaderboard() {

        console.log("Attempting to populate leaderboard")

        $.ajax({
            type: "GET",
            url: "./php/getLeaderboard.php",
            dataType:"json",
            success : function(data){
                
                console.log("Successfully populating leaderboard")
                console.log(data)

                // Empty the current leaderboard
                var tableBody = $('.modal-body.leaderboard').find('tbody').empty()

                for (player of data) {

                    var tableRow = $('<tr></tr>')  
                    var playerName = $('<td>'+player[0]+'</td>')
                    var playerTravelTime = $('<td>'+player[1]+'</td>')
                    var playerPuzzleTime = $('<td>'+player[2]+'</td>')
                    var playerTotalTime = $('<td>'+player[3]+'</td>')                  

                    tableRow.append(playerName).append(playerTravelTime).append(playerPuzzleTime).append(playerTotalTime)
                    tableBody.append(tableRow)

                }


            }
        });

    }

    // Leaderboard has a method to display itself
    showLeaderboard() {

        // Show the inventory modal
        $('#leaderboard-modal').modal('show')
        
    }

}

// Function to show the leaderboard
function showLeaderboard() {

    // Populate and then show the leaderboard
    leaderboard.populateLeaderboard()
    leaderboard.showLeaderboard()

}