// Class to hold the clock and timing system
class Clock{

    // Constructor
    constructor() {

        // Initialise the clock with midday
        this.currentTime = new Date(2020,7,1,12,0,0,0) 

        // Split up the time to make it accessible to the clock elements
        this.currentHour = this.currentTime.getHours()
        this.currentMinute = this.currentTime.getMinutes()

        // Set the time on the clock to be midday
        $('.clock-digit.hours-tens').text()

    }

}
