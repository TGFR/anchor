import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Button, Icon, Modal } from 'semantic-ui-react'
import {Login, Signup} from './auth-form';
import {logout} from '../store'

class NavBar extends React.Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      admin: false,
      activeItem: '',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state
    return (
      <Menu>
        <Menu.Item
          as={Link}
          to='/'
          name="logo"
          onClick={this.handleItemClick}
        >
          <Icon name="anchor" size="huge" />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to='/classes'
          name='browseAll'
          onClick={this.handleItemClick}
        >
          Browse All
        </Menu.Item>

        {this.props.isAdmin ? <Menu.Item
          name='admin'
        >
          <Button as={Link} to='/admin' color="purple">
            Admin Page
        </Button>
        </Menu.Item>
        : null}

          <Menu.Menu position="right">

               {this.props.loggedIn ? <Menu.Item name='orders'> <Link to='/orders'> My Orders </Link> </Menu.Item> : null}

            <Menu.Item
              name='login'
            >
            {!this.props.loggedIn ?
                <Modal trigger={
                <Button primary>
                  Log in/Sign up
                </Button> }>
                    <Menu tabular>
                        <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} />
                        <Menu.Item name='SignUp' active={activeItem === 'SignUp'} onClick={this.handleItemClick} />
                        {activeItem === 'Login' ? <Login /> : <Signup />}
                    </Menu>

                </Modal> : <Button onClick={this.props.logOut} primary> Logout </Button>}
          </Menu.Item>


            <Menu.Item
              as={Link}
              to='/cart'
              name='cart'
              active={activeItem === 'cart'}
              onClick={this.handleItemClick}
            >
            <Icon name='cart' size='big' />
          </Menu.Item>
          </Menu.Menu>

      </Menu>
    )
  }

}

const mapProps = ({ user }) => ({ loggedIn: Object.keys(user).length > 0, isAdmin: user.privilege === 'admin'
});
// const mapState = ({user}) => ({user})

const mapDispatch = dispatch => ({
  logOut: () => {
    dispatch(logout())
    history.push('/');
  }

})

export default connect(mapProps, mapDispatch)(NavBar)
