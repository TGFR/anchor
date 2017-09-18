import React from 'react'
import { Container, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setFilter } from '../store'

class SearchBar extends React.Component {

  constructor (){
    super();
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillUnmount() {
    this.props.updateFilter('');
  }

  render() {
    const size = this.props.size || 'big';

    return (
      <Container textAlign='center' className='search-container'>
        <Input fluid size={size} icon='search' placeholder='What are you looking to learn?' onChange={this.handleChange} />
      </Container>
    )
  }

  handleChange(event) {
    this.props.updateFilter(event.target.value);
  }
}

const mapState = (state) => {
  return {
    filter: state.filter,
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateFilter: filter => dispatch(setFilter(filter)),
  }
}

export default connect(mapState, mapDispatch)(SearchBar);
