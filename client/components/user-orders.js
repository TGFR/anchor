import React from 'react';
import { Header, Accordion, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

const UserOrders = (props) => {
  console.log('in orders component')
  const {myOrders} = props;
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
      title: order.id, //Not sure I understand why we are making the title the order.id, BUT if this is what we want then I have no objections
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
