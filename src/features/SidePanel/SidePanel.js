import React, { Component } from 'react';
import {connect} from 'react-redux'
import UserInfo from './UserInfo'
import './SidePanel.css'

const SidePanel = ({user}) => {
  return <div className="SidePanel">
    <UserInfo/>
    Side Panel
  </div>
}


const mapDispatchToProps = (dispatch) => ({
  // checkIfLoggedIn: () => checkIfLoggedIn(dispatch)
})
const mapStateToProps = state => ({
  user: state.data.user
})

export default connect(mapStateToProps)(SidePanel)
