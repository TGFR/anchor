import React from 'react';
import { connect } from 'react-redux';
import { Menu, Form } from 'semantic-ui-react'
import SearchBar from './search-bar';
import {addFilterCategory, removeFilterCategory, clearFilterCategories} from '../store';

class Filter extends React.Component {

  constructor() {
    super()
    this.state = {
      checked: {},
    }
    this.handleChecking = this.handleChecking.bind(this);
  }

  handleChecking (id) {
    let currentCategory = this.props.categories.find(catFound => Number(catFound.id) === id);

    if (!this.props.filterCategories.includes(currentCategory)) {
      this.props.addFilterCategory(currentCategory);
    }
    else {
      this.props.removeFilterCategory(currentCategory);
    }
  }

  componentWillUnmount(){
    this.props.clearFilters();
  }

  componentWillReceiveProps(newProps){
    let checkedState = {};
    newProps.filterCategories.forEach(function(category) {
      checkedState[category.id] = true;
    });
    this.setState({checked: checkedState})
  }

  render() {
    return (
      <Menu vertical>
        <SearchBar size='small' />
        {
          this.props.categories.map((category) => {
            return (
              <Form.Checkbox key={category.id} label={category.title} value={category.id} checked={this.state.checked[category.id]} onChange={() => this.handleChecking(category.id)} />
            )
          })
        }
      </Menu>
    );
  }
}

const mapState = (state) => {
  return {
    categories: state.categories,
    filterCategories: state.filterCategories,
  }
}

const mapDispatch = (dispatch) => {
  return {
    addFilterCategory: (category) => dispatch(addFilterCategory(category)),
    removeFilterCategory: (category) => dispatch(removeFilterCategory(category)),
    clearFilters: () => dispatch(clearFilterCategories())
  }
}

export default connect(mapState, mapDispatch)(Filter);
