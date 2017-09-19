import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button } from 'semantic-ui-react';
import { clearErrors } from '../store';

const ErrorDisplay = (props) => {

  if (!props.errors || !props.errors.length) return <div />;

  return (
    <Container>
      {
        props.errors.map((err, index) => {
          return (
            <Container key={index}>
              <Header>{err.message}</Header>
              <Container text={true}>{err.content}</Container>
            </Container>
          )
        })
      }
    <Button color='red' onClick={props.clearErrors}>
      Dismiss All
    </Button>
    </Container>
  )
}

const mapState = (state) => {
  return {
    errors: state.errors
  }
}

const mapDispatch = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors)
  }
}

export default connect(mapState, mapDispatch)(ErrorDisplay);
