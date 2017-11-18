var weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: weeks,
        datasets: [{
                label: "P3",
                borderColor: 'rgb(255, 153, 148)',
                backgroundColor: 'rgb(255, 153, 148)',
                data: [46.3, 51.1, 54.7, 57.6, 60.0, 61.9, 63.6, 65.1, 66.5, 67.7, 69.0, 70.2, 71.3, 72.4, 73.4, 74.4, 75.4, 76.3, 77.2, 78.1, 78.9, 79.7, 80.5, 81.3, 82.1],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P15",
                borderColor: 'rgb(255, 207, 148)',
                data: [47.9, 52.7, 56.4, 59.3, 61.7, 63.7, 65.4, 66.9, 68.3, 69.6, 70.9, 72.1, 73.3, 74.4, 75.5, 76.5, 77.5, 78.5, 79.5, 80.4, 81.3, 82.2, 83.0, 83.8, 84.6],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P50",
                borderColor: 'rgb(94, 255, 183)',
                data: [49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72.0, 73.3, 74.5, 75.7, 76.9, 78.0, 79.1, 80.2, 81.2, 82.2, 83.2, 84.2, 85.1, 86.0, 86.9, 87.8],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P85",
                borderColor: 'rgb(255, 207, 148)',
                data: [51.8, 56.7, 60.5, 63.5, 66.0, 68.1, 69.8, 71.4, 72.9, 74.3, 75.6, 77.0, 78.2, 79.4, 80.6, 81.8, 82.9, 84.0, 85.1, 86.1, 87.1, 88.1, 89.1, 90.0, 91.0],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P97",
                borderColor: 'rgb(255, 153, 148)',
                backgroundColor: 'rgb(255, 153, 148)',
                data: [53.4, 58.4, 62.2, 65.3, 67.8, 69.9, 71.6, 73.2, 74.7, 76.2, 77.6, 78.9, 80.2, 81.5, 82.7, 83.9, 85.1, 86.2, 87.3, 88.4, 89.5, 90.5, 91.6, 92.6, 93.6],
                fill: false,
                borderWidth: 1,
            }
        ]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Peso (kg)'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Semana'
                }
            }]
        }
    }
});
