//NODE MODULES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
        Button,
        Container,
        Header,
        Input,
        Icon,
        Label,
        Segment,
        Table,
       } from 'semantic-ui-react'

//LOCAL MODULES
import {
        checkOut,
        updateItem,
        removeFromCart,
        clearCart,
         } from '../store/cart'
import {formInputError} from '../store'
import EmptyCart from './cart/emptyCart'


class Cart extends Component {
  constructor(props) {
    super(props);
  }

  handleUpdateQuantity = (e, classId) => {
    const quantity = e.target.value;
    this.props.updateCart({[classId]: quantity})
  }

  handleDeleteItem = (e, classId) => {
    this.props.removeItemFromCart(classId);
  }

  handleClearCart = (e) => {
    this.props.cleanCart();
  }

  handleSubmit = (e, userEmail = '', userId) => {
    //Below is the email validation field
    // if(userEmail) {
    //   let filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   filter.test(userEmail) ?
    //   this.props.createOrder(userEmail, userId) :
    //   this.props.formError(new Error('Please enter a valid email address'))
    //   return;
    // }
    this.props.createOrder(userEmail, userId);
  }

  render() {
    let button;
    let isUserLoggedIn = Object.keys(this.props.user).length ? true : false;

    if (isUserLoggedIn) {
      button = <Button onClick={e => this.handleSubmit(e, '', this.props.user.id)} color='teal'><Icon name='cart' />Checkout</Button>
    } else {
      button = <Input
        action={{ onClick: e => this.handleSubmit(e, 'TODO_on_cart_component', ''), color: 'teal', labelPosition: 'left', icon: 'cart', content: 'Checkout' }}
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
        <Table.Row key={lesson.id}>
          <Table.Cell textAlign='left'>{lesson.title}</Table.Cell>
          <Table.Cell>${lesson.price}</Table.Cell>
          <Table.Cell selectable>
            <input onChange={(e) => this.handleUpdateQuantity(e, item[0])} type='number' name='order-item-id' min={1} max={lesson.quantity} defaultValue={item[1]} />
          </Table.Cell>
          <Table.Cell>${lesson.price * item[1]}</Table.Cell>
          <Table.Cell><Icon onClick={(e) => this.handleDeleteItem(e, item[0])} name='remove circle outline' size='big' color='red' /></Table.Cell>
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
            <Table.HeaderCell><Button onClick={this.handleClearCart} negative>Clear Cart </Button> </Table.HeaderCell>
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
    createOrder: (userEmail = '', userId) => {
      dispatch(checkOut(userEmail, userId));
    },
    updateCart: cartItem => {
      dispatch(updateItem(cartItem));
    },
    removeItemFromCart: classId => {
      dispatch(removeFromCart(classId));
    },
    cleanCart: () => dispatch(clearCart()),
    formError: error => dispatch(formInputError(error)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
