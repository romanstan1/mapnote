import React, { Component, Fragment } from 'react';
import {logIn, getRedirect} from 'store/modules/action-creators'
import {Button, Mapnote} from 'components'
import {connect} from 'react-redux'
import './Login.css'

const GoogleLogo = () =>
  <svg viewBox="0 0 48 48">
    <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
  </svg>

const Login = ({logIn}) =>
  <Fragment>
    <div className='header'>
      <Mapnote/>
    </div>
    <div className='Login'>
      <h1>
        Find, Connect, Discover.
      </h1>
      <h2>
        Sit amet, dolor adipisicing elit. Rem eaque aliquid odit accusantium deleniti eos, necessitatibus ipsam sit.
      </h2>
      <div className='button-wrap'>
        <p>Get started. Log in with</p>
        <Button primary onClick={logIn}>
          <GoogleLogo/>
          <p>Google</p>
        </Button>
      </div>
    </div>
  </Fragment>


const mapDispatchToProps = (dispatch) => ({
  logIn: () => dispatch(logIn())
})

export default connect(null, mapDispatchToProps)(Login)
