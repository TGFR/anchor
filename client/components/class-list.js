import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import axios from 'axios'

export default class ClassList extends React.Component {

  constructor() {
    super();
    this.state = {
      classes: []
    }
  }

  componentDidMount() {
    console.log('mounted claslist')
    axios.get('/api/classes')
      .then(res => res.data)
      .then(classes => {
        this.setState({ classes })
      })
      .catch(console.error.bind(console));
  }

  render() {
    return (
      <div>
        <Card.Group>
        {this.state.classes.map(lesson => {
          return (
            <Card>
              <Image src={lesson.photo} />
              <Card.Content>
                  {lesson.title}
              </Card.Content>
            </Card>
          );
        })}
        </Card.Group>
      </div>
    )
  }

}
