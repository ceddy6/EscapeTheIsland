
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