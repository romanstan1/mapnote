import React, { Component, PureComponent } from 'react';
import {init, drawMarkers} from './d3-module.js'
import Scene from './Scene'
import InputLocation from './InputLocation'
import {connect} from 'react-redux'
import {addNote} from 'store/modules/action-creators'

class Map extends Component {
  componentDidMount() {
    init()
    // drawMarkers(nextProps.notes)
  }
  componentWillReceiveProps(nextProps) {
    drawMarkers(nextProps.notes)
  }
  handleAdd = (latitude, longitude) => {
    this.props.dispatch(addNote(latitude, longitude))
    // drawMarkers(this.props.notes)
  }
  render() {
    return (
      <div className="Home">
        <Scene/>
        <InputLocation handleAdd={this.handleAdd}/>
      </div>
    )
  }
}

export default connect(state => ({
  notes: state.data.notes
}))(Map)
