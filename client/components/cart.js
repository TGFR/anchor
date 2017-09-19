//NODE MODULES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Header, Input, Icon, Label, Segment, Table } from 'semantic-ui-react'

//LOCAL MODULES
import { checkOut } from '../store/cart'
import EmptyCart from './cart/emptyCart'


class Cart extends Component {
  constructor(props) {
    super(props);
  }


  handleSubmit = e => {
    console.log('created order!')
    //Below is the connection to the thunk from the store
    //uncomment it when we are ready to test creating an order
    // this.props.createOrder('created order!')
  }

  render() {
    let button;
    let isUserLoggedIn = Object.keys(this.props.user).length ? true : false;

    if (isUserLoggedIn) {
      button = <Button onClick={this.handleSubmit} color='teal'><Icon name='cart' />Checkout</Button>
    } else {
      button = <Input
        action={{ onClick: this.handleSubmit, color: 'teal', labelPosition: 'left', icon: 'cart', content: 'Checkout' }}
        actionPosition='right'
        placeholder='Please enter your email'
        defaultValue=''
        type='text'
      />
    }

    let orderItems = Object.entries(this.props.cart);
    let subtotal = 0;

    orderItems = orderItems.map(item => {
      item[0] = Number(item[0]) //coerces string to number
      const lesson = this.props.classes.filter(lesson => {
        return lesson.id === item[0]
      })[0]

      subtotal += item[1] * lesson.price;

      return (
        <Table.Row>
          <Table.Cell textAlign='left'>{lesson.title}</Table.Cell>
          <Table.Cell>${lesson.price}</Table.Cell>
          <Table.Cell selectable>
            <input type='number' name='order-item-id' min={1} max={lesson.quantity} defaultValue={item[1]} />
          </Table.Cell>
          <Table.Cell>${lesson.price * item[1]}</Table.Cell>
          <Table.Cell><Icon name='remove circle outline' size='big' color='red' /></Table.Cell>
        </Table.Row>
      )
    })

    let cartDetail = <Container textAlign='center'>
      <Header as='h2' textAlign='center' style={{ margin: '15px' }}>My Cart</Header>
        <Table textAlign='center'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='left'>Title</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Subtotal</Table.HeaderCell>
            <Table.HeaderCell><Button negative>Clear Cart </Button> </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          {orderItems}
        </Table.Body>
      </Table>

      <Label>Order Subtotal</Label>
      <Segment vertical basic>
        <span>${subtotal}</span>
      </Segment>

      {button}
    </Container>

    return Object.keys(this.props.cart).length ? cartDetail : <EmptyCart />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart,
    classes: state.classes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrder: order => {
      dispatch(checkOut(order));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
