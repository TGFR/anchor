import React from 'react';
import { connect } from 'react-redux';
import { Menu, Form } from 'semantic-ui-react'
import {setFilter} from '../store';
import SearchBar from './search-bar';

class Filter extends React.Component {

  constructor(){
    super()

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.props.updateFilter(event.target.value);
  }

  render() {
    return (
      <Menu vertical>
        <SearchBar size='small' onChange={this.handleChange} />
        {
          this.props.categories.map((category) => {
            return (
              <Form.Checkbox key={category.id} label={category.title} value={category.id} />
            )
          })
        }
      </Menu>
    );
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

export default connect(mapState, mapDispatch)(Filter);
