import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {
        Main,
        Home,
        Login,
        Signup,
        Cart,
        UserHome,
        ClassList,
        OrderList,
        SingleClass,
        UserOrders,
        AdminPage
      } from './components'
import {
        me,
        fetchAllClasses,
        fetchCart,
        fetchOrders,
        fetchAllUsers,
        fetchMyOrders,
        clearMyOrders,
        clearOrders,
        fetchCategories
      } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props
    console.log(isAdmin)

    return (

      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path='/' component={Home} />
            <Route exact path='/classes' component={ClassList} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/cart' component={Cart} />
            <Route path='/classes/:id' component={SingleClass} />

            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path='/home' component={UserHome} />
                  <Route path='/admin/orders' component={OrderList} />
                  <Route path='/orders' component={UserOrders} />
                  {isAdmin && <Route path='/admin' component={AdminPage} />}
                </Switch>
            }
            {

            }
            {/* Displays our Login component as a fallback */}
            {/* <Route component={Login} /> */}
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.privilege === 'admin'
  }
}

const mapDispatch = (dispatch) => {
  // TODO get current user id
  // TODO eliminate unnecessary dispatches
  return {
    loadInitialData: () => {
      dispatch(me())
      .then( res => {
        if (res.user.id){
          dispatch(fetchMyOrders(res.user.id))
        }
      })
      .catch( err => {
        dispatch(clearMyOrders())
        dispatch(clearOrders())
        console.error(err)
      })
      dispatch(fetchAllClasses())
      dispatch(fetchCart())
      // isAdmin ? dispatch(fetchOrders()) dispatch(fetchAllUsers()) : null
      dispatch(fetchCategories())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
