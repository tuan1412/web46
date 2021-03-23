import React, { Component } from 'react';
import logo from '../../images/giphy-logo.svg';
import './header.style.css'

// chuyen chu Tim kiem

// Fragment => <></>
class Header extends Component {
  render() {
    return (
      <>
        <div className="Header">
          <img src={logo} alt="logo" />
          <h1>{this.props.label}</h1>
        </div>
      </>
    );
  }
}

export default Header;
