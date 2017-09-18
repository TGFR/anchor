import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Container, Icon, Image, Input } from 'semantic-ui-react'
import axios from 'axios'
/**
 * COMPONENT
 */
const ClassList = props => {
  const {classes} = props
  return (
    <div>

      <Card.Group>
      {classes.map(lesson => {
        return (
          <Card key={lesson.id}>
            <Link to={`/classes/${lesson.id}`}>
              <Image src={lesson.photo} />
            </Link>
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

/**
 * CONTAINER
 */
const mapState = ({classes}) => ({classes})

export default connect(mapState, null)(ClassList)
