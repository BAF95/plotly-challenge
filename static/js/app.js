// Test Subject ID No. menu and default plots
function getName() {
    // Select dropdown menu id and assign it to a variable
    var dropdownMenu = d3.select('#selDataset');
    // Read "names" values from json file and append into dropdown menu
    d3.json('data/samples.json')
        .then(subject => subject.names
        .forEach(name => dropdownMenu
            .append('option')
            .text(name)
            .property('value'),

            // Initialize page with default metadata and plots
            getMetadata(subject.names[0]),
            getBar(subject.names[0]),
            getBubble(subject.names[0]),
            getGauge(subject.names[0])
        ),
    );
};

// Function called by DOM changes
function optionChanged(id) {
    getMetadata(id);
    getBar(id);
    getBubble(id);
    getGauge(id);
};

// Demographic Info
function getMetadata(id) {
    // Read "metadata" from json file for each subject and assign it to a variable
    d3.json('data/samples.json')
        .then(data => {
        var subjectData = data.metadata
        .filter(subject => subject.id.toString() === id)[0];

        // Select demographic info id and assign it to a variable
        var subjectMetadata = d3.select('#sample-metadata');
        // Clear metadata befor displaying new selection data
        subjectMetadata.html('');
        // Push data into demographic info card
        Object.entries(subjectData)
            .forEach(([key, value]) => subjectMetadata
            .append('p')
            .text(`${key}: ${value}`),
        );
    });
};

getName();

// Bar chart
function getBar(id) {
    // Read data from json file for each sample, assign it to a variable, and plot it
    d3.json('data/samples.json')
        .then(data => {
        var sortedSample = data.samples
        .filter(sample => sample.id === id)[0];
        console.log(sortedSample);
        // Trace for bar chart that displays each sample top 10 OTU values
        var barTrace = {
            x: sortedSample.sample_values.slice(0,10).reverse(),
            y: sortedSample.otu_ids.slice(0,10).map(otuid => `OTU ${otuid}`).reverse(),
            text: sortedSample.otu_labels.slice(0,10).reverse(),
            hoverlabel: {font: {size: 12}},
            marker: {
                color: [
                    '#001f4d',
                    '#003380',
                    '#0047b3',
                    '#005ce6',
                    '#1a75ff',
                    '#3399ff',
                    '#66a3ff',
                    '#99c2ff',
                    '#b3d9ff',
                    '#e6f0ff'
                ],
                opacity: 1,
            },
            type: 'bar',
            orientation: 'h'
        };
        // Data
        var data = [barTrace];
        // Layout
        var layout = {
            title: {
                text: `Top 10 OTU for Test Subject No. ${id}`,
                font: {
                    family: 'Arial',
                    size: 24,
                    color: 'black'
                },
            },
            //margin: {l: 100, r: 50, t: 50, b: 50},
            height: 600,
            width: 630,
            xaxis: {
                tickwidth: 10,
                tickcolor: '#ffffff',
                tickfont: {family: 'Arial', color: 'darkgrey'},
                title: {
                    text: "Value",
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'darkgrey'
                    },
                },
            },
            yaxis: {
                automargin: true,
                tickwidth: 20,
                tickcolor: '#ffffff',
                tickfont: {family: 'Arial', color: 'darkgrey'},
                title: {
                    text: 'Bacteria ID ',
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'darkgrey'
                    },
                },
            },
        };
        // Render the plot to the div tag with id 'bar'
        Plotly.newPlot('bar', data, layout, {
            modeBarButtonsToRemove: [
                'zoom2d',
                'pan2d',
                'select2d',
                'lasso2d',
                'autoScale2d',
                'toggleSpikelines',
                'hoverCompareCartesian'
            ]},
        );
    });
};

// Bubble chart
function getBubble(id) {
    // Read data from json file for each sample, assign it to a variable, and plot it
    d3.json('data/samples.json')
        .then(data => {
        var sortedSample = data.samples
        .filter(sample => sample.id === id)[0];
        console.log(sortedSample);

        // Trace for bubble chart that displays each sample values
        var bubbleTrace = {
            x: sortedSample.otu_ids,
            y: sortedSample.sample_values,
            text: sortedSample.otu_labels,
            mode: "markers",
            marker: {
                size: sortedSample.sample_values,
                color: sortedSample.otu_ids,
                colorscale: [
                    [0, '#b3d1ff'],
                    [0.2, '#b3d1ff'],
                    [0.2, '#1a75ff'],
                    [0.4, '#1a75ff'],
                    [0.4, '#00cc88'],
                    [0.6, '#00cc88'],
                    [0.6, '#ccffcc'],
                    [0.8, '#ccffcc'],
                    [0.8, '#99ff33'],
                    [1.0, '#99ff33'],
                ],
                opacity: 0.8,
                line: {
                    color: '#999999',
                    width: 1
                }
            },
        };
        // Data
        var data = [bubbleTrace];
        // Layout
        var layout = {
            title: {
                text: `Test Subject No. ${id} Belly Button Biodiversity`,
                font: {
                    family: 'Arial',
                    size: 24,
                    color: 'black'
                },
            },
            //margin: {l: 50, r: 100, t: 30, b: 30},
            height: 520,
            width: 920,
            xaxis: {
                tickcolor: '#ffffff',
                tickfont: {family: 'Arial', color: 'darkgrey'},
                title: {
                    text: 'OTU ID (Bacteria)',
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'darkgrey'
                    },
                },
            },
            yaxis: {
                automargin: true,
                tickcolor: '#ffffff',
                tickfont: {family: 'Arial', color: 'darkgrey'},
                title: {
                    text: 'Sample Value',
                    font: {
                        family: 'Arial',
                        size: 18,
                        color: 'darkgrey'
                    },
                },
            },
        };
        // Render the plot to the div tag with id 'bubble'
        Plotly.newPlot('bubble', data, layout, {
            modeBarButtonsToRemove: [
                'zoom2d',
                'pan2d',
                'select2d',
                'lasso2d',
                'autoScale2d',
                'toggleSpikelines',
                'hoverCompareCartesian'
            ]},
        );
    });
};

// Gauge chart
function getGauge(id) {
    // Read "metadata" from json file for each subject and assign it to a variable
    d3.json('data/samples.json')
        .then(data => {
        var subjectData = data.metadata
        .filter(subject => subject.id.toString() === id)[0];
        console.log(subjectData);

        // Extract "wfreq" data and assign it to a variable to build an indicator
        var value = subjectData.wfreq;
        console.log(value);
        // Data
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                type: 'indicator',
                mode: 'gauge+number',
                value: value,
                title: {
                    text: 'Belly Button Washing Frequency <br><i>Scrubs per Week</i>',
                    font: { size: 24, color: 'black', family: 'Arial'}
                },
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: 'darkgrey'},
                    bar: { color: '#cccccc', thickness: 0.3},
                    bgcolor: 'white',
                    borderwidth: 0,
                    bordercolor: 'gray',
                    steps: [
                        { range: [0, 1], color: '#d9ffb3'},
                        { range: [1, 2], color: '#bbff99'},
                        { range: [2, 3], color: '#ccffcc'},
                        { range: [3, 4], color: '#00cc88'},
                        { range: [4, 5], color: '#b3d9ff'},
                        { range: [5, 6], color: '#66a3ff'},
                        { range: [6, 7], color: '#1a75ff'},
                        { range: [7, 8], color: '#005ce6'},
                        { range: [8, 9], color: '#003d99'}
                    ],
                },
            },
        ];
        // Layout
        var layout = {
            width: 440,
            height: 360,
            margin: { t: 35, r: 15, l: 15, b: 0},
            font: { color: 'darkgrey', family: 'Arial'}
        };
        // Render the plot to the div tag with id 'gauge'
        Plotly.newPlot('gauge', data, layout);
    });
};