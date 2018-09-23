import React, { Component } from 'react';
import {connect} from 'react-redux'
import UserInfo from './UserInfo'
import './SidePanel.css'



const UserNote  = ({note}) => {
  return <div className='UserNote'>
    <div>{note.title}</div>
    <div>{note.content}</div>
    <div>{note.hiddenContent}</div>
    <div>{note.date}</div>
    <div>{note.lat} - {note.lng}</div>
  </div>
}


const SidePanel = ({user, notes}) => {
  let userArray = []
  if(notes.length) {
    userArray = Object.values(notes.find(note => user.uid === note[0])[1])
  }

  return (
    <div className="SidePanel">
      <UserInfo/>
      {
        userArray.map(note =>
          <UserNote key={note.noteIds} note={note}/>)
      }
    </div>
  )
}


const mapDispatchToProps = (dispatch) => ({
  // checkIfLoggedIn: () => checkIfLoggedIn(dispatch)
})
const mapStateToProps = state => ({
  user: state.data.user,
  notes: state.data.notes
})

export default connect(mapStateToProps)(SidePanel)
