import React, {Component, Fragment} from 'react'
import GoogleMapReact from 'google-map-react';
import styles from './gmaps-style'
import {connect} from 'react-redux'
import {addNote} from 'store/modules/action-creators'

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

class Gmaps extends Component {

  static defaultProps = {
    center: {
      lat: 51.507256,
      lng: -0.070512
    },
    zoom: 11
  }

  handleClick = ({ x, y, lat, lng, event }) => {
    this.props.dispatch(addNote(lat, lng))
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPNOTE_GMAPS}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{
            styles
          }}

          onClick={this.handleClick}
        >
          <HomeMarker
            lat={ 51.507256 }
            lng={ -0.070512 }
            text={' Marker '}
          />
          {
            this.props.notes.map((note, i) =>
              <LocationMarker
                key={i + note.latitude + note.longitude }
                lat={ note.latitude }
                lng={ note.longitude }
              />
            )
          }
        </GoogleMapReact>
      </div>
    )
  }
}



export default connect(state => ({
  notes: state.data.notes
}))(Gmaps)
