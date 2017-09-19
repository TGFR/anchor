import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Container, Icon, Image, Input, Tab } from 'semantic-ui-react'
import {fetchOrders, fetchAllUsers} from '../store'
import OrderList from './order-list'
import UserList from './user-list'

class AdminPage extends React.Component {

  constructor() {
    super()
  }

  componentDidMount(){
    this.props.loadAdminData()
  }
  render() {
    const panes = [
      { menuItem: 'Orders', render: () => <Tab.Pane> <OrderList /> </Tab.Pane>},
      { menuItem: 'Users', render: () => <Tab.Pane> <UserList /> </Tab.Pane>},
    ]
    return <Tab panes={panes} />
  }

}



/**
 * CONTAINER
 */
const mapState = ({user, orders, users}) => ({user, orders, users})
const mapDispatch = (dispatch) => {
  return {
    loadAdminData: () => {
        dispatch(fetchOrders())
        dispatch(fetchAllUsers())
}
  }}

export default connect(mapState, mapDispatch)(AdminPage)

