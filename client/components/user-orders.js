import React from 'react';
import { Header, Accordion, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

const UserOrders = (props) => {
  const {myOrders} = props;
  const ordersAccordion = myOrders.map( order => {
    const orderItems = order.orderItems.length ? order.orderItems.map( orderItem => {
      return (
        <Table.Row key={orderItem.id}>
          <Table.Cell>{orderItem.class.title}</Table.Cell>
          <Table.Cell>{orderItem.quantity}</Table.Cell>
          <Table.Cell>${orderItem.price}</Table.Cell>
        </Table.Row>
      )
    }) : null;
    return {
      //dateTime yuckkkk this might break
      title: 'Order #' + order.id + '\t\t' + order.orderDate.split('T')[0], //Not sure I understand why we are making the title the order.id, BUT if this is what we want then I have no objections
      content: (
        <Table compact celled definition key={order.id}>
          <Table.Body>
            {orderItems}
          </Table.Body>
        </Table>
      ),
    }
  })
  return (
    <div>
      <h1 style={{display: 'flex', justifyContent: 'center'}}>Previous Orders </h1>
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
