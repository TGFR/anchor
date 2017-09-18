//NODE MODULES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Header, Input, Icon, Label, Segment } from 'semantic-ui-react'

//LOCAL MODULES
import { checkOut } from '../store/cart'
import EmptyCart from './cart/emptyCart'


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'guest'
    }
  }

  handleSubmit = e => {
    console.log('created order!')
    //Below is the connection to the thunk from the store
    //uncomment it when we are ready to test creating an order
    // this.props.createOrder('created order!')
  }

  render() {
    let button;
    let { view } = this.state.view
    {/* {this.props.user.keys.length ? view = 'user' : view = 'guest'} */}

    switch (this.state.view) {
      case 'user':
        button = <Button onClick={this.handleSubmit} color='teal'><Icon name='cart'/>Checkout</Button>
        break
      case 'guest':
        button = <Input
                    action={{onClick: this.handleSubmit, color: 'teal', labelPosition: 'left', icon: 'cart', content: 'Checkout' }}
                    actionPosition='right'
                    placeholder='Please enter your email'
                    defaultValue=''
                    type='text'
                  />
        break
      default:
        break;
    }

    let cartDetail = <Container textAlign='center'>
        <Header as='h2'textAlign='center' style={{margin: '15px'}}>My Cart</Header>
          {/* If cart is not empty then we will display the following for each item in the cart */}
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
        
        {button}
    </Container>
    
    return this.state.view === 'empty' ? <EmptyCart /> : cartDetail;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
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
