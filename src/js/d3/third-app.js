/**
 * Created by Luis Blanco on 10/15/2016.
 */

// Get a Selection of the groups
var groups = d3.selectAll('g');
// Get a nested Selection of the circles
var circles = groups.selectAll('circle');
//console.log(circles);
// [[<circle />, <circle />], [<circle />, <circle />]]


//d3.select('body').insert('p', '.first').text('I like fruits.');

// Use dynamic properties for the radius
//circles.attr('r', function(d, i) { return d; });

// Create a data array
//var data = [10, 20, 30, 40];
// Bind data array to the Selection
//var circles = d3.selectAll('circle').data(data);
//console.log(circles.data());
// [10, 20, 30, 40]



// Create a data array containing objects
var data = [
    {cx:50, cy:50, r: 10, color: '#ff0000'},
    {cx:150, cy:50, r: 20, color: '#ff0066'},
    {cx:250, cy:50, r: 30, color: '#ff00aa'},
    {cx:350, cy:50, r: 40, color: '#ff00ff'}
];

var circles = d3.selectAll('circle').data(data);

circles
// Set the stroke color to black
    .attr('stroke', 'black')
    // Set the fill color
    // depending of the bound object
    .attr('fill', function(d, i) { return d.color; })
    // Set the x coordinate of the center
    // depending of the bound object
    .attr('cx', function(d, i) { return d.cx; })
    // Set the y coordinate of the center
    // depending of the bound object
    .attr('cy', function(d, i) { return d.cy; });

// Bind data array to the Selection
var circles = d3.selectAll('circle').data(data);
// Use dynamic properties for the radius
circles.attr('r', function(d, i) { return d.r; });

// Set the stroke width
// depending on the index
circles.style('stroke-width', function(d, i) { return i*2; }) ;

var width = 800;
var height = 500;
// Create the containers
var svg = d3.select('body').append('svg')
    .attr("width", width)
    .attr("height", height);
var svg_data = svg.append('g')
    .attr('class', 'data');
var svg_axis = svg.append('g')
    .attr('class', 'axis');
var svg_x_axis = svg_axis.append('g')
    .attr('class', 'x-axis');
var svg_y_axis = svg_axis.append('g')
    .attr('class', 'y-axis');
// Margins
var margin = {top: 40, right: 40, bottom: 40, left:60};

var start = new Date('2013-01-01');
var end = new Date('2013-12-31');
// Random data point generator
var randPoint = function() {
    var rand = Math.random;
    var rand_time = start.getTime() + rand() * (end.getTime() - start.getTime());
    return {x: new Date(rand_time), y: rand() * 5000, r: rand() * 10};
};

// Create a data array with 300 random data points
var data = d3.range(300).map(randPoint);

function draw() {
    var x_scale = d3.time.scale()
        .domain([start, d3.max(data, function(d) { return d.x; })])
        .range([margin.left, width - margin.right])
        .nice();
    var y_scale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([margin.top, height - margin.bottom])
        .nice();

    var x_axis = d3.svg.axis()
        .scale(x_scale)
        .orient('top')
        .tickFormat(d3.time.format('%b %d'));
    svg_x_axis
        .attr("transform", "translate(0, " + margin.top + ")")
        .call(x_axis);
    var y_axis = d3.svg.axis()
        .scale(y_scale)
        .orient('left')
        .tickFormat(d3.format(".3s"));

    svg_y_axis
        .attr("transform", "translate(" + margin.left + ")")
        .call(y_axis);

    // Set a key function to identify the elements
    var key = function(d, i) { return d.x + '#' + d.y; }
    // Bind data array to the Selection
    var circles = svg_data.selectAll('circle').data(data, key);
    // update the dataset
    circles
    // Add circles for new data
        .enter()
        .append('circle')
        // Change the properties of all circles
        .attr('r', function(d) { return d.r; })
        .attr('cx', function(d) { return x_scale(d.x); })
        .attr('cy', function(d) { return y_scale(d.y); })
        .attr('fill', function(d, i) {
            return 'rgb(' + parseInt(d.r*25) + ',0,' + parseInt(d.r*25)
                + ')';
        })
        // Delete circles when removed from data
        .exit()
        .remove();
};

// Do every 50ms
setInterval(function(){
    // Remove first element from data array
    data.shift();
    // Add new random element to data array
    data.push(randPoint());
    // Redraw the scene
    draw();
}, 50);

