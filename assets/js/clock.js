// Class to hold the clock and timing system
class Clock{

    // Constructor
    constructor() {

        // Initialise the clock with midday
        this.currentTime = new Date(2020,7,1,12,0,0,0) 
        this.setClock(this.currentTime)

    }

    // Function to add a second
    tick(){

        // Add the second
        clock.currentTime.setSeconds( clock.currentTime.getSeconds() + 1 );

        // Update the clock
        clock.setClock(clock.currentTime)

    }

    // Function to take a datetime object and write it into the elements
    setClock(time){

        // Split up the time to make it accessible to the clock elements
        var currentHour = time.getHours()
        var currentMinute = time.getMinutes()
        var currentSecond = time.getSeconds()

        // Split into explicit digits
        var currentHourTens = Math.floor(currentHour/10)
        var currentHourUnits = currentHour%10
        var currentMinuteTens = Math.floor(currentMinute/10)
        var currentMinuteUnits = currentMinute%10
        var currentSecondTens = Math.floor(currentSecond/10)
        var currentSecondUnits = currentSecond%10

        // Select the elements and write the time
        $('.clock-digit.hours-tens').find('.digital-no').text(currentHourTens)
        $('.clock-digit.hours-units').find('.digital-no').text(currentHourUnits)
        $('.clock-digit.minutes-tens').find('.digital-no').text(currentMinuteTens)
        $('.clock-digit.minutes-units').find('.digital-no').text(currentMinuteUnits)
        $('.clock-digit.seconds-tens').find('.digital-no').text(currentSecondTens)
        $('.clock-digit.seconds-units').find('.digital-no').text(currentSecondUnits)

    }

    // Function to add a set amount of time to the clock (in minutes)
    addTravelTime(tAdd){

        // Add the travel time to the running total (travel time is in minutes) and travel time is stored in the db in seconds
        runningTravelTime += tAdd * 60

        // Variable to show time added so far
        var tAdded = 0

        // Add the extra time one minute at a time to show clock spinning
        var journeyTimer = setInterval(function(){

            // Add the time
            clock.currentTime.setMinutes( clock.currentTime.getMinutes() + 1 )

            // Set the clock
            clock.setClock(clock.currentTime)

            tAdded = tAdded + 1

            if (tAdded > tAdd) {
                clearInterval(journeyTimer)
            }

        },35)

    }

}
