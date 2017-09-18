import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Form } from 'semantic-ui-react'
import setFilter from '../store/filter.js';
import SearchBar from './search-bar';

const Filter = (props) => {

  return (
    <Menu vertical>
      <SearchBar size='small' onChange={(event) => props.updateFilter(event.target.value)} />
      {
        props.categories.map( (category) => {
          return (
            <Form.Checkbox key={category.id} label={category.title} value={category.id} />
          )
        })
      }
    </Menu>
  );
}

const mapState = (state) => {
  return {
    filter: state.filter,
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateFilter: (filter) => dispatch(setFilter(filter))
  }
}

export default connect(mapState, mapDispatch)(Filter);
