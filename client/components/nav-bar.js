import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Button, Icon, Modal } from 'semantic-ui-react'
import {Login, Signup} from './auth-form';


export default class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      admin: false,
      activeItem: 'Login',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name="logo"
        >
          <Link to='/'>
            <Icon name="anchor" size="huge" />
          </Link>
        </Menu.Item>

        <Menu.Item
          name='browseAll'
        >
          <Link to='/classes'>
            Browse All
          </Link>
        </Menu.Item>

        {this.state.admin && <Menu.Item
          name='admin'
          onClick={this.handleItemClick}
        >
          <Button color="purple">
            Admin Page
        </Button>
        </Menu.Item>
        }

          <Menu.Menu position="right">
            <Menu.Item
              name='login'
            >
            <Modal trigger={
            <Button primary>
              Log in/Sign up
            </Button> }>
            <Menu tabular>
                <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} />
                <Menu.Item name='SignUp' active={activeItem === 'SignUp'} onClick={this.handleItemClick} />
                {activeItem === 'Login' ? <Login /> : <Signup />}
            </Menu>

            </Modal>
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
