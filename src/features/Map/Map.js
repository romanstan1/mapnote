import React, {Component, Fragment} from 'react'
// import GoogleMapReact from 'google-map-react';
import styles from './gmaps-style'
import {connect} from 'react-redux'
import {addNote} from 'store/modules/action-creators'
import './Map.css'
import * as d3 from 'd3'
// import GoogleMapsLoader from 'google-maps';
const {google, MarkerClusterer} = window

var cur_zoom = 3,
prev_zoom = cur_zoom;

const HomeMarker = ({ text }) =>
<div className="HomeMarker">
  <div className="ringring"></div>
  <div className="circle"></div>
</div>

const LocationMarker = () =>
<div className="LocationMarker">
  <div className="ringring"></div>
  <div className="circle"></div>
</div>

var locations = [
  {lat: -31.563910, lng: 147.154312, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -33.718234, lng: 150.363181, data: 'somedata'},
  {lat: -33.727111, lng: 150.371124, data: 'somedata'},
  {lat: -33.848588, lng: 151.209834, data: 'somedata'},
  {lat: -33.851702, lng: 151.216968, data: 'somedata'},
  {lat: -34.671264, lng: 150.863657, data: 'somedata'},
  {lat: -35.304724, lng: 148.662905, data: 'somedata'},
  {lat: -36.817685, lng: 175.699196, data: 'somedata'},
  {lat: -36.828611, lng: 175.790222, data: 'somedata'},
  {lat: -37.750000, lng: 145.116667, data: 'somedata'},
  {lat: -37.759859, lng: 145.128708, data: 'somedata'},
  {lat: -37.765015, lng: 145.133858, data: 'somedata'},
  {lat: -37.770104, lng: 145.143299, data: 'somedata'},
  {lat: -37.773700, lng: 145.145187, data: 'somedata'},
  {lat: -37.774785, lng: 145.137978, data: 'somedata'},
  {lat: -37.819616, lng: 144.968119, data: 'somedata'},
  {lat: -38.330766, lng: 144.695692, data: 'somedata'},
  {lat: -39.927193, lng: 175.053218, data: 'somedata'},
  {lat: -41.330162, lng: 174.865694, data: 'somedata'},
  {lat: -42.734358, lng: 147.439506, data: 'somedata'},
  {lat: -42.734358, lng: 147.501315, data: 'somedata'},
  {lat: -42.735258, lng: 147.438000, data: 'somedata'},
  {lat: -43.999792, lng: 170.463352, data: 'somedata'}
]

class Gmaps extends Component {

  static defaultProps = {
    center: {
      lat: 51.507256,
      lng: -0.070512
    },
    zoom: 8
  }

  componentDidMount() {
     var london = {lat: 51.5074, lng: 0.1278}
     var map = new google.maps.Map(this.refs.mapRef, {
       zoom: cur_zoom,
       center: {lat: -28.024, lng: 140.887},
       styles: styles,
       // maxZoom: 12,
       // minZoom: 5
     })

    var icon = {
      path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
      fillColor: '#FF0000',
      fillOpacity: .6,
      anchor: new google.maps.Point(0,0),
      strokeWeight: 0,
      scale: 1
    }

    var template = [
      '<?xml version="1.0"?>',
          '<svg width="26px" height="26px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">',
              '<circle stroke="#00FDDC" fill="{{ color }}" cx="50" cy="50" r="35"/>',
          '</svg>'
      ].join('\n');

    var svg = template.replace('{{ color }}', '#00FDDC');

    var markers = locations.map((location, i) => {
       const marker = new google.maps.Marker({
        position: location,
        map: map,
        somedata:location.data,
        title: 'Dynamic SVG Marker',
        icon: { url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg), scaledSize: new google.maps.Size(20, 20) }, optimized: false
      })
      google.maps.event.addListener(marker, 'click', (e) => {
       // console.log('marker click', e, this, marker)
       this.openModal(marker)
      });
      return marker
    })

    var markerCluster = new MarkerClusterer(map, markers,
      // {imagePath: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg) }
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
    )

    map.addListener('click', (event) => {
      console.log('clicked map', event)
    // map.setCenter(marker.getPosition());
    })

  }

  openModal = (marker) => {
    console.log('openModal', marker, marker.position.lat())
  }

  handleClick = ({ x, y, lat, lng, event }) => {
    console.log('latlng:', lat, lng)
    // this.props.dispatch(addNote(lat, lng))
  }

  render() {
    const {notes} = this.props
    return (
      <div ref='mapRef' style={{ height: '100vh', width: '100%', position: 'relative' }}>
      </div>
    )
  }
}

export default connect(state => ({
  notes: state.data.notes
}))(Gmaps)
