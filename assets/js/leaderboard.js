
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

                for (var entry of data) {

                    var tableRow = $('<tr></tr>')  
                    var playerName = $('<td>'+entry[0]+'</td>')
                    var playerTravelTime = $('<td>'+formatTime(entry[1])+'</td>')
                    var playerPuzzleTime = $('<td>'+formatTime(entry[2])+'</td>')
                    var playerTotalTime = $('<td>'+formatTime(entry[3])+'</td>')                  

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

    // Method to convert a string into hours, minutes, seconds

}

// Function to show the leaderboard
function showLeaderboard() {

    // Populate and then show the leaderboard
    leaderboard.populateLeaderboard()
    leaderboard.showLeaderboard()

}


// Function to convert ms time to hh:mm:ss
function formatTime(time) {

    var fTime = new Date(parseInt(time)*1000)
    var hh = fTime.getHours() - 1
    var mm = fTime.getMinutes()
    var ss = fTime.getSeconds()
    
    var str = hh + "h " + mm + "m " + ss + "s"

    return str

}