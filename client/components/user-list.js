import React from 'react';
import { Header, Table, Checkbox, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const UserList = (props) => {
  const {users} = props;
  const userTableRows = users.length ? users.map( user => {
    return (
      <Table.Row key={user.id}>
        <Table.Cell collapsing>
          <Checkbox slider />
        </Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.privilege}</Table.Cell>
        <Table.Cell>{user.privilege ==='authenticated' ? <Button color='purple'>Promote</Button> : null} </Table.Cell>
        <Table.Cell><Button color='red'>Delete</Button> </Table.Cell>
        <Table.Cell><Button color='black'>Reset Password</Button></Table.Cell>
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
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Bulk Delete</Table.HeaderCell>
            <Table.HeaderCell>Bulk Reset</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userTableRows}
        </Table.Body>

      </Table>
    </div>

  )
}

const mapState = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatch = () => {
  return {};
}


export default connect(mapState, mapDispatch)(UserList);
