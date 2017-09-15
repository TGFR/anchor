import React from 'react'
import { Container, Input } from 'semantic-ui-react'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export default Home => {

  return (
    <div style={{height: '100vh', backgroundImage: 'url("splash.jpg")', backgroundSize: 'cover'}} >
      <Container textAlign='center'>
        <Input fluid size='big' icon='search' placeholder='What are you looking to learn?' />
      </Container>
    </div>
  )
}

