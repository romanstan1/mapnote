import React, { Component } from 'react';
import './Button.css'

export default ({children, onClick, primary, secondary}) =>
  <div
    className={primary? 'button primary' :  secondary? 'button secondary' : 'button'}
    onClick={onClick}
    >
    {children}
  </div>
