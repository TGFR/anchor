import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Container, Icon, Image, Input } from 'semantic-ui-react'
import Filter from './filter'
/**
 * COMPONENT
 */
const ClassList = props => {
  let {classes} = props
  const filter = new RegExp(props.filter, 'i');

  classes = classes.filter(lesson => {
    return filter.test(lesson.title, 'i');
  })

  return (
    <div className='browse-all'>
      <Filter />
      <Card.Group>
      {
      classes.map(lesson => {
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
const mapState = ({classes, filter}) => ({classes, filter})

export default connect(mapState, null)(ClassList)
