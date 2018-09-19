import React, { Component, Fragment } from 'react';

export default class InputLocation extends Component {
  state = {
    latitude: 0,
    longitude: 0
  }
  handleInput = (e) => {
    this.setState({[e.target.dataset.type]: e.target.value})
  }
  handleAdd = () => {
    const {latitude, longitude} = this.state
    this.props.handleAdd(parseInt(latitude), parseInt(longitude))
  }
  render() {
    const {latitude, longitude, handleInput} = this.state
    return (
      <Fragment>
        <div className="input-location">
          <div>
            <label>Lat</label>
            <input type="text" value={latitude} data-type='latitude' onChange={this.handleInput}/>
          </div>

          <div>
            <label>Long</label>
            <input type="text" value={longitude} data-type='longitude' onChange={this.handleInput}/>
          </div>
          <div className='add-location' onClick={this.handleAdd}> Add </div>
        </div>
      </Fragment>
    )
  }
}
