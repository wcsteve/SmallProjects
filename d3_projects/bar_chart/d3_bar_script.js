var x = d3.scaleLinear()
.domain([0, d3.max(dataset1)])
.range([0, 420]);

d3.select('.chart')
  .selectAll('div')
  .data(dataset1)
  .enter()
  .append('div')
  .style('width', function(d) {
    return x(d) + 'px';
  })
  .text(function(d) {
    return d;
  });
