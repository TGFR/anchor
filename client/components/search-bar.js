import React from 'react'
import { Container, Input } from 'semantic-ui-react'

export default SearchBar => {

  return (
    <Container textAlign='center' className='search-container'>
      <Input fluid size='medium' icon='search' placeholder='What are you looking to learn?' />
    </Container>
  )
}
