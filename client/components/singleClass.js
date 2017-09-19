import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Image, Grid, Header, Form, Segment } from 'semantic-ui-react'
import { addToCart } from '../store';

/**
 * COMPONENT
 */
class SingleClass extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 1,
      acceptedTerms: false,
    }

    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this);
  }


  render() {
    const lesson = this.props.lesson || `https://react.semantic-ui.com/assets/images/wireframe/image.png`;
    return (
      <Grid celled divided stackable stretched>
        <Grid.Row stretched>
          <Grid.Column width={8} stretched>
            <Image src={lesson.photo} size='large' />
            <Header>Category</Header>
          </Grid.Column>
          <Grid.Column width={8} stretched>
            <Header>{lesson.title}</Header>
            <Header>rating</Header>
            <Header>Seller Location</Header>
            <Segment inverted>
              <Form inverted onSubmit={this.handleSubmit}>
                <Form.Field label='Quantity' control='input' onChange={this.handleQuantity} type='number' min={1} value={this.state.quantity} />
                <Form.Checkbox onChange={this.handleCheckbox} required label='I agree to the Terms and Conditions' checked={this.state.acceptedTerms}/>
                <Button type='submit' disabled={!this.state.acceptedTerms}>Add to Cart</Button>
              </Form>
            </Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  handleCheckbox () {
    this.setState({acceptedTerms: !this.state.acceptedTerms})
  }

  handleQuantity (event) {
    this.setState({quantity: Number(event.target.value)});
  }

  handleSubmit(event) {
    event.preventDefault();
    let quantity = this.state.quantity;
    this.props.addToCart(this.props.lesson, quantity)
  }

}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    lesson: state.classes.find(lessonFound => lessonFound.id === id),
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToCart: (lesson, quantity) => {
      const lessonToSend = {};
      lessonToSend[lesson.id] = quantity;
      dispatch(addToCart(lessonToSend));
    }
  }
}

export default connect(mapState, mapDispatch)(SingleClass)
