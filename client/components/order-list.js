import React from 'react';
import { Header, Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';

const OrderList = (props) => {
  const {orders, users} = props;
  const orderTableRows = users.length ? orders.map( order => {
    const user = users.find(foundUser => foundUser.id === order.userId)
    return (
      <Table.Row key={order.id}>
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
        <Table.Cell>{order.id}</Table.Cell>
        <Table.Cell>{user.id}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{order.orderDate}}</Table.Cell>
        <Table.Cell>{order.status}</Table.Cell>
        <Table.Cell>{order.subtotal}</Table.Cell>
      </Table.Row>
    )
  }) : <Table.Row></Table.Row>
  return (
    <div>
      <Header as='h2' textAlign='center'>Orders</Header>
      <Table compact celled definition>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              <Checkbox slider />
            </Table.HeaderCell>
            <Table.HeaderCell>Order Id</Table.HeaderCell>
            <Table.HeaderCell>User Id</Table.HeaderCell>
            <Table.HeaderCell>User Email</Table.HeaderCell>
            <Table.HeaderCell>Order Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Subtotal</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orderTableRows}
        </Table.Body>

      </Table>
    </div>

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
