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
