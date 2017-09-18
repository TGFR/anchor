import React from 'react'
import { Container, Input } from 'semantic-ui-react'

const SearchBar = (props) => {

  const size = props.size || 'big';

  return (
    <Container textAlign='center' className='search-container'>
    <Input fluid size={size} icon='search' placeholder='What are you looking to learn?' />
  </Container>
  )
}

export default SearchBar;
