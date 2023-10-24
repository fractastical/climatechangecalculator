// Prepare the data for Chart.js
var years = seaLevelData.map(function(d) { return d.year; });
var sea_levels = seaLevelData.map(function(d) { return d.gmsl_variation; });

var chartData = [];  // Define chartData array


// Prepare the data for Chart.js
var chartData = seaLevelData.map(function(d) {
    return {
        x: decimalYearToDate(d.year),
        y: d.gmsl_variation
    };
});

// Define the chart data
var data = {
    datasets: [{
        label: 'Global Mean Sea Level Change (mm)',
        data: chartData,
        fill: false,
        borderColor: 'blue',
        tension: 0.1
    }]
};


// Define the chart options
// Define the chart options
var options = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'year',
                displayFormats: {
                    year: 'yyyy'
                },
                tooltipFormat: 'yyyy'
            },
            title: {
                display: true,
                text: 'Year'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Sea Level Change (mm)'
            }
        }
    }
};

// Get the context of the canvas element we want to select
var ctx = document.getElementById('seaLevelChart').getContext('2d');

// Create the chart
var seaLevelChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});


function decimalYearToDate(decimalYear) {
    // Extract the year
    var year = parseInt(decimalYear);
    // Get the remainder and convert it to milliseconds
    var remainder = (decimalYear - year) * (365 * 24 * 60 * 60 * 1000);
    var start = new Date(year, 0, 1); // Start at the beginning of the year

    return new Date(start.getTime() + remainder);
}


// Function to convert decimal year to a Date object
function decimalYearToDate(decimalYear) {
    var year = parseInt(decimalYear);
    var remainder = (decimalYear - year) * (365 * 24 * 60 * 60 * 1000);
    var start = new Date(year, 0, 1);

    return new Date(start.getTime() + remainder);
}

// Current date and date a decade ago
var now = new Date();
var decadeAgo = new Date();
decadeAgo.setFullYear(now.getFullYear() - 10);

// Filter data from the last decade
var recentData = seaLevelData.filter(function(record) {
    var recordDate = decimalYearToDate(record.year);
    return recordDate >= decadeAgo;
});

// Ensure there's enough data to calculate the rate
if (recentData.length < 2) {
    console.log("Not enough data");
} else {
    // Get the earliest and latest sea level records
    var earliestRecord = recentData[0];
    var latestRecord = recentData[recentData.length - 1];

    // Calculate sea level change and time elapsed
    var seaLevelChange = latestRecord.gmsl_variation - earliestRecord.gmsl_variation;
    var timeElapsed = latestRecord.year - earliestRecord.year; // in years, since the data uses decimal years

    // Calculate the average rate of change
    var averageRateOfChange = seaLevelChange / timeElapsed; // in mm per year


    // Convert from mm per year to mm per second
    var secondsInAYear = 365.25 * 24 * 60 * 60; // days * hours * minutes * seconds
    var rateOfChangePerSecond = averageRateOfChange / secondsInAYear; // mm per second

    console.log("The average rate of sea level change over the last decade is " + averageRateOfChange.toFixed(2) + " mm per year.");
    console.log("The average rate of sea level change over the last decade is " + rateOfChangePerSecond.toFixed(10) + " mm per second.");

}
