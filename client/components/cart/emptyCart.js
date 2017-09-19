import React from 'react';
import { Container, Icon, Message} from 'semantic-ui-react'

const EmptyCart = (props) => (
  <Container textAlign='center'>
    <Message info>
      <Message.Header>When you add classes to your cart they will show up here.</Message.Header>
      <Icon name='smile' size='huge' />
    </Message>
  </Container>
)

export default EmptyCart;
