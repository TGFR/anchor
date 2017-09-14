import React from 'react';
import { Item } from 'semantic-ui-react';
import { connect } from 'react-redux';

const OrderList = (props) => (
  <Item.Group>
    {
      props.orders.map((order) => {
        return (
          <Item key = {order.id}>
            <Item.Image size='tiny' src='/assets/images/wireframe/image.png' />
            <Item.Content>
              <Item.Header>{order.title}</Item.Header>
              <Item.Meta>Date: {order.date}</Item.Meta>
              <Item.Extra>Price: {order.subtotal}</Item.Extra>
            </Item.Content>
          </Item>
        )
      })
    }
  </Item.Group>
);

const mapState = (state) => {
  return {
    orders: state.orders
  }
}

const mapDispatch = () => {
  return {};
}


export default connect(mapState, mapDispatch)(OrderList);
