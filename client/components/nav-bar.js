import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react'


export default class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      admin: false,
    };
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name="logo"
          active={activeItem === "logo"}
          onClick={this.handleItemClick}
        >
          Logo
        </Menu.Item>

        <Menu.Item
          name='browseAll'
          active={activeItem === 'browseAll'}
          onClick={this.handleItemClick}
        >
          Browse All
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          >
            Log in
          </Menu.Item>

          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
            Sign Up
          </Menu.Item>


          <Menu.Item
            name='cart'
            active={activeItem === 'cart'}
            onClick={this.handleItemClick}
          >
            My Cart
          </Menu.Item>
        </Menu.Menu>

      </Menu>
    )
  }

}
