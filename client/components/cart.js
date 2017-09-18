import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Header, Input, Icon, Label, Message, Segment } from 'semantic-ui-react'


export default Cart => {
  let guestCheckout = <Input
    action={{ color: 'teal', labelPosition: 'left', icon: 'cart', content: 'Checkout' }}
    actionPosition='right'
    placeholder='Please enter your email'
    defaultValue=''
    type='text'
  />

  let userCheckout =   <Button color='teal'><Icon name='cart'/>Checkout</Button>

  //If cart is not empty then we will display the following for each item in the cart
  let cartDetail = <Container textAlign='center'>
    <Header as='h2'textAlign='center'>My Cart</Header>
    <Segment raised className='order-item'>
      <span>Class Title</span>
      <span>Price</span>
      <span>Quantity <input type='number' name='order-item-id' min={1} max={10} defaultValue={1}/> </span>
      <span>Item Subtotal</span>
      <Icon name='remove circle outline' size='big' color='red' />
    </Segment>
    <Label>Order Subtotal</Label>
    <Segment vertical basic>
      <span>$99.99</span>
    </Segment>

    {/* {this.state.user.keys.length ? userCheckout : guestCheckout} */}
    {guestCheckout}

  </Container>

  //If cart is empty the we will display the following message
  let emptyCart = <Container textAlign='center'>
    <Message info>
      <Message.Header>When you add classes to your cart they will show up here.</Message.Header>
      <Icon name='smile' size='huge' />
    </Message>
  </Container>

  return (
    cartDetail
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

// export default connect(mapStateToProps, null)(Cart)
