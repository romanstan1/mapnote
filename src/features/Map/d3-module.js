import * as d3 from 'd3'

const google = window.google

var cur_zoom = 7,
prev_zoom = cur_zoom;


// Load the station data. When the data comes back, create an overlay.
var map = new google.maps.Map(d3.select("#map").node(), {
zoom: cur_zoom,
center: new google.maps.LatLng(30.331227, -97.725019),
'styles': styles,
//mapTypeId: google.maps.MapTypeId.TERRAIN,
maxZoom: 12,
minZoom: 5
});

//test data file
file = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/125707/clusters.json';
//file = 'clusters.json';

//function to caculate dist btw points. Args in format [x, y]
function coords_dist( point1, point2 ) {
    var xs = 0;
    var ys = 0;

    xs = point2[0] - point1[0];
    xs = xs * xs;

    ys = point2[1] - point1[1];
    ys = ys * ys;

    return Math.sqrt( xs + ys );
}

d3.json(file, function(error, data) {
    if (error) return console.warn(error);

    //save full cluster data, then get
    var clusters = data,
        data = clusters[cur_zoom];

    var overlay = new google.maps.OverlayView();

    //set bounds based on data's max lat and long
    var latmax = d3.max(data, function(d){ return d.latitude }),
        latmin = d3.min(data, function(d){ return d.latitude }),
        longmax = d3.max(data, function(d){ return d.longitude }),
        longmin = d3.min(data, function(d){ return d.longitude }),
        southWest = new google.maps.LatLng(latmin, longmin),
        northEast = new google.maps.LatLng(latmax, longmax),
        new_bounds = new google.maps.LatLngBounds(southWest, northEast);

    // map marker radius to values between 6px and 20px
    var marker_radius = d3.scale.linear()
      .domain( d3.extent(data, function(d) { return d.size; }) )
      .range([8, 16]);

// Add the container when the overlay is added to the map.
overlay.onAdd = function() {
  //map.fitBounds(new_bounds);
  var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
      .attr("class", "stations");

  // Draw each marker as a separate SVG element.
  // We could use a single SVG, but what size would it have?
  overlay.draw = function() {
    prev_zoom = cur_zoom;
    cur_zoom = map.getZoom();

    console.log("zoom is " + cur_zoom + ", prev zoom is " + prev_zoom);
    data = clusters[cur_zoom];

    var projection = this.getProjection(),
        padding = 10;

    var marker = layer.selectAll("svg")
        //.data(d3.values(data))
        .data(data, function(d) { return d3.values(d); })
        .each(display); // update existing markers

    // add new markers, with some custom transitions
    marker.enter().append("svg:svg")
        .each(display)
        .attr("width", function(d) { return marker_radius(d.size)*2 + padding*2 })
        .attr("height", function(d) { return marker_radius(d.size)*2 + padding*2 })
        .attr("class", "marker")
        .style("margin-top", function(d) {return "-" + (marker_radius(d.size) + padding)/2 + "px"; })
        .style("margin-left", function(d) {return "-" + (marker_radius(d.size) + padding)/2 + "px"; })
        .each(animateIn);

    // remove markers, add some exit transitions later
    marker.exit()
          .each(display)
          .each(animateOut);

    // Add a circle.
    marker.append("svg:circle")
        .attr("r", function(d) { return marker_radius(d.size); })
        .attr("cx", function(d) { return marker_radius(d.size) + padding })
        .attr("cy", function(d) { return marker_radius(d.size) + padding });

    // Add a label in the center of the circle
    marker.append("svg:text")
        .attr("x", function(d) { return marker_radius(d.size) + padding })
        .attr("y", function(d) { return marker_radius(d.size) + padding })
        .style("text-anchor", "middle")
        .attr("dy", ".31em")
        .text(function(d) { return d.size; });

    function display(d) {
      var pos = map_pixel(d.latitude, d.longitude);

      return d3.select(this)
          .style("left", (pos.x - padding) + "px")
          .style("top", (pos.y - padding) + "px");
    }

    function map_pixel(lat, long) {
      var pos = new google.maps.LatLng(lat, long);
      pos = projection.fromLatLngToDivPixel(pos);

      return pos;
    }

    //animate the markers from the position of their "parent" cluster to their actual position
    function animateIn(d) {
      var el = d3.select(this);
      // check if element's "zoom" data is equal to the current zoom
      if( d.zoom == cur_zoom ) {
        //only animate position if we're zooming in
        if( cur_zoom > prev_zoom ) {
          var parent_data = clusters[cur_zoom - 1][d.parent],
              parent_map_pos = map_pixel(parent_data.latitude, parent_data.longitude),
              self_pos = map_pixel(d.latitude, d.longitude);

          return d3.select(this).style('left', (parent_map_pos.x - padding) + 'px')
            .style('top', (parent_map_pos.y - padding) + 'px')
            .attr('opacity', 0)
            .transition()
            .duration(800)
            .style("left", (self_pos.x - padding) + "px")
            .style("top", (self_pos.y - padding) + "px")
            .attr('opacity', 1);
        } else {
          // fade in if zooming out
          return d3.select(this).attr('opacity', 0)
            .transition()
            .duration(800)
            .attr('opacity', 1);
        }
      } // end zoom check. don't transition if el is not in the current zoom bucket.
    }

    // exit animation
    // animate position of markers from current position to parent position
    function animateOut(d) {
      el = d3.select(this);

      // check if elements "zoom" data attribute is equal to cur_zoom + 1
      //only animate position if zooming out and the element is from one zoom level down
      if( d.zoom == (cur_zoom+1) && cur_zoom < prev_zoom ) {
        var parent_data = data[d.parent],
            parent_map_pos = map_pixel(parent_data.latitude, parent_data.longitude);

        return d3.select(this).transition()
          .duration(800)
          .style('left', (parent_map_pos.x - padding) + 'px')
          .style('top', (parent_map_pos.y - padding) + 'px')
          .attr('opacity', 0)
          .each("end",function() {
            d3.select(this).remove();
           });
      } else if(d.zoom == (cur_zoom-1) && cur_zoom > prev_zoom ) {
        // if zooming in and element is from one zoom level up, fade out opacity
        console.log("removing element during zoom in");
        return d3.select(this).transition()
          .delay(400)
          .duration(400)
          .attr('opacity', 0)
          .each("end",function() {
            d3.select(this).remove();
           });
      } else {
        // if element is not from the immediately preceding zoom level, remove immediately
        console.log("remove immediately");
        return d3.select(this).remove();
      }
    }

  };
};

// Bind overlay to the map…
overlay.setMap(map);
});
