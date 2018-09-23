import React, {Component, Fragment} from 'react';
import Login from './Login/Login'
import Map from './Map/Map'
import SidePanel from './SidePanel/SidePanel'
import {connect} from 'react-redux'
import {checkIfLoggedIn} from 'store/modules/action-creators'
import './Home.css'

const Loading = () => <div className="loader"></div>

class Home extends Component {
  componentDidMount() {
    this.props.checkIfLoggedIn()
  }
  render() {
    switch(this.props.user_logged_in){
      case 'pending': {
        return (
          <div className="Home">
            <Loading/>
          </div>
        )
      }
      case true: {
        return (
          <div className="Home">
            <SidePanel/>
            <Map/>
          </div>
        )
      }
      default: return <Login/>
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkIfLoggedIn: () => checkIfLoggedIn(dispatch)
})
const mapStateToProps = state => ({
  user: state.data.user,
  user_logged_in: state.data.user_logged_in
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
