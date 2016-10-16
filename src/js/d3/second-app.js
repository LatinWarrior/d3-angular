/**
 * Created by Luis Blanco on 10/15/2016.
 */
// Select all circle tags
var circ = d3.selectAll('circle');

// Select all elements with the class 'item'
var items = d3.selectAll('.item');

// Select the first element with the id 'first-item'
var first = d3.select('#first-item');

// Add a SVG attribute to all circle tags
circ.attr('r', '50');

// Change the fill color of the items
items.style('fill', 'red');

// Remove the element #first-item from the DOM
first.remove();
