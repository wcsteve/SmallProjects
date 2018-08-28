var width = 960,
    height = 500;

var y = d3.scaleLinear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

d3.tsv("data.tsv", type).then( data => {
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", barWidth - 1)
      .attr("y", function(d) { return y(d.value); })

  bar.append("text")
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("x", barWidth / 2)
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });
})
  // console.log(data)
  // x.domain([0, d3.max(data, function(d) { return d.value; })]);
  //
  // chart.attr("height", barHeight * data.length);
  //
  // var bar = chart.selectAll("g")
  //     .data(data)
  //   .enter().append("g")
  //     .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
  //
  // bar.append("rect")
  //     .attr("width", function(d) { return x(d.value); })
  //     .attr("height", barHeight - 1);
  //
  // bar.append("text")
  //     .attr("x", function(d) { return x(d.value) - 3; })
  //     .attr("y", barHeight / 2)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.value; });
// });

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}
