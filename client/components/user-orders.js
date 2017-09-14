import React from 'react';
import { Header, Accordion, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

const UserOrders = (props) => {
  const {myOrders} = props;
  console.log('myOrders:', myOrders);
  const ordersAccordion = myOrders.map( order => {
    const orderItems = order.orderItems.length ? order.orderItems.map( orderItem => {
      return (
        <Table.Row key={orderItem.id}>
          <Table.Cell>{orderItem.id}</Table.Cell>
          <Table.Cell>${orderItem.price}</Table.Cell>
        </Table.Row>
      )
    }) : null;
    return {
      title: order.id,
      content: (
        <Table compact celled definition>
          <Table.Body>
            {orderItems}
          </Table.Body>
        </Table>
      ),
    }
  })
  return (
    <div>
      <Accordion panels={ordersAccordion} styled exclusive={false} />
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
