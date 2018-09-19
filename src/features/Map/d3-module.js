import * as d3 from 'd3'
import * as d3_queue from 'd3-queue'
import * as topojson from 'topojson'

const width = window.innerWidth
const height = window.innerHeight
// const width = 600
// const height = 500
const config = {
  speed: 0.0,
  verticalTilt: -30,
  horizontalTilt: 0
}
// let locations = []
let svg, markerGroup

let projection, initialScale, path, center, locations

let london = [-0.118667702475932, 51.5019405883275];

let lineToLondon

export function init() {
    svg = d3.select('svg').attr('width', width).attr('height', height)
    markerGroup = svg.append('g')
    projection = d3.geoOrthographic()
    // .scale(245)
     // .rotate([0, 0])
     .translate([width / 2, (height / 2) - 20])
     // .clipAngle(90)

    initialScale = projection.scale()
    path = d3.geoPath().projection(projection)
    center = [width/2, height/2]

    drawGlobe()
    drawGraticule()
    enableRotation()

}

function drawGlobe() {
    d3_queue.queue()
    .defer(d3.json, 'world.json')
    .await((error, worldData) => {
        svg.selectAll(".segment")
        .data(topojson.feature(worldData, worldData.objects.countries).features)
        .enter().append("path")
        .attr("class", "segment")
        .attr("d", path )
        .style("stroke", "#2f6674")
        .style("stroke-width", "1px")
        .style("fill", (d, i) => '#073e57')
        // .style("opacity", ".9");
    })
}

var zoom = d3.zoom()
	.scaleExtent([0.75, 50]) //bound zoom
	.on("zoom", zoomed);

function drawGraticule() {
    const graticule = d3.geoGraticule().step([10, 10])

    svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "#011626")
        .style("stroke", "#083038");
}

var scl = Math.min(width, height)/2;

function zoomed() {
  projection.scale(d3.event.transform.translate(projection).k * scl)
  svg.selectAll("path").attr("d", path)
  if(!!locations) drawMarkers()
}

function enableRotation() {
    const sens = 0.25

    svg
    .call(d3.drag()
     .subject(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
     .on("drag", function() {
       var rotate = projection.rotate();
       projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
       svg.selectAll("path").attr("d", path)
       // svg.selectAll(".focused").classed("focused", focused = false);
       if(!!locations) drawMarkers()
     }))
     .call(zoom)
     // projection.rotate([config.speed * 1 - 120, config.verticalTilt, config.horizontalTilt])
}

export function drawMarkers(locationData) {
    lineToLondon = (r) => {
        return path({"type": "LineString", "coordinates": [london, [r.longitude, r.latitude] ]});
    }
    if(!!locationData) locations = locationData
    const markers = markerGroup.selectAll('circle').data(locations)
    markers
        .enter()
        .append('circle')
        .merge(markers)
        .attr('cx', d => projection([d.longitude, d.latitude])[0])
        .attr('cy', d => projection([d.longitude, d.latitude])[1])
        .attr('fill', d => {
            const coordinate = [d.longitude, d.latitude]
            const gdistance = d3.geoDistance(coordinate, projection.invert(center))
            return gdistance > 1.52 ? 'none' : '#003bff'
        })
        .attr('r', d => {
            const coordinate = [d.longitude, d.latitude]
            const gdistance = d3.geoDistance(coordinate, projection.invert(center))
            const size = 8 - Math.pow(gdistance, 4)
            return size
        })
        .attr("d", (d) => lineToLondon(d))

    svg
        .append("g")
        .attr("class","lines")
        .selectAll(".lines")
        .data(locations)
        .enter()
        .append("path")
        .attr("class", "lines")
        .style("stroke", "#a8217d")
        .style("stroke-width", "1px")
        .attr("fill", "none")
        .attr("d", d => lineToLondon(d))

    markerGroup.each(function () {
        this.parentNode.appendChild(this);
    })
}
