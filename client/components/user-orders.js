import React from 'react';
import { Header, Accordion, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

const UserOrders = (props) => {
  const {myOrders} = props;
  console.log('myOrders:', myOrders);
  const ordersAccordion = myOrders.map( order => {
    return {
      title: order.id,
      content: 'hello',
    }
  })
  return (
    <div>
      <Accordion panels={ordersAccordion} styled />
    </div>
  )
}

const mapState = (state) => {
  return {
    myOrders: state.myOrders,
    user: state.user,
  }
}

const mapDispatch = () => {
  return {};
}

export default connect(mapState, mapDispatch)(UserOrders);
