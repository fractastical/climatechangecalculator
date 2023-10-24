// Prepare the data for Chart.js
var years = seaLevelData.map(function(d) { return d.year; });
var sea_levels = seaLevelData.map(function(d) { return d.gmsl_variation; });

// Define the chart data
var data = {
    labels: years,
    datasets: [{
        label: 'Global Mean Sea Level Change (mm)',
        data: sea_levels,
        fill: false,
        borderColor: 'blue',
        tension: 0.1
    }]
};

// Define the chart options
var options = {
    scales: {
        x: {
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
