import React from 'react'
import { Container, Input } from 'semantic-ui-react'


export default Home => {

  return (
    <div style={{height: '100vh', backgroundImage: 'url("splash.jpg")', backgroundSize: 'cover', paddingTop: '15px'}} >
      <Container textAlign='center' className='search-container'>
        <Input fluid size='big' icon='search' placeholder='What are you looking to learn?' />
      </Container>
    </div>
  )
}
