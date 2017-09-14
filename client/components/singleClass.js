import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Image, Grid, Header, Form, Segment } from 'semantic-ui-react'
import axios from 'axios'
/**
 * COMPONENT
 */
export default class SingleClass extends Component {
  constructor(props) {
    super(props)

    this.state = {
      a:1,
      b:2,
    }
  }


  render () {
    return (
      <Grid celled divided stackable stretched>
      <Grid.Row stretched>
        <Grid.Column width={8} stretched>
          <Image src={`https://react.semantic-ui.com/assets/images/wireframe/image.png`} size='large' />
          <Header>Category</Header>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          <Header>Lesson Title</Header>
          <Header>rating</Header>
          <Header>Seller Location</Header>
          <Segment inverted>
            <Form inverted>
                <Form.Select label='First name' placeholder='First name' />
                <Form.Select label='Last name' placeholder='Last name' />
              <Form.Checkbox label='I agree to the Terms and Conditions' />
              <Button type='submit'>Submit</Button>
            </Form>
          </Segment>  

        </Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }


}

/**
 * CONTAINER
 */
const mapState = ({classes}) => ({classes})

// export default connect(mapState, null)(SingleClass)
