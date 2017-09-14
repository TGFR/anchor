import React from 'react';
import { Item } from 'semantic-ui-react';
import { connect } from 'react-redux';

const OrderList = (props) => {
  const {orders, users} = props;
  console.log('users:', users);
  return (
    <Item.Group>
      {
        orders.map((order) => {
          user = users.find(user => user.id === order.userId)
          return (
            <Item key = {order.id}>
              <Item.Image size='tiny' src='/assets/images/wireframe/image.png' />
              <Item.Content>
                <Item.Header>User: {user.email}</Item.Header>
                <Item.Meta>Date: {order.orderDate}</Item.Meta>
                <Item.Extra>Price: {order.subtotal}</Item.Extra>
              </Item.Content>
            </Item>
          )
        })
      }
    </Item.Group>
  )
}

const mapState = (state) => {
  return {
    orders: state.orders,
    users: state.users,
  }
}

const mapDispatch = () => {
  return {};
}


export default connect(mapState, mapDispatch)(OrderList);
