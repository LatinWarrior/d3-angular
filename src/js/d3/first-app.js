/**
 * Created by Luis Blanco on 10/15/2016.
 */
var ps = d3.selectAll('p');

var items = d3.selectAll('.item');

var first = d3.select('#first-item');

ps.attr('align', 'center');

items.style('background-color', 'red');

first.remove();
