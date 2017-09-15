/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { clearOrders } from '../../client/store/orders'
//import axios from 'axios'
//import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

//const mockAxios = new MockAdapter(axios)
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

xdescribe('orders thunk creators', () => {
  let store;

  const initialState = { orders: [] };

  beforeEach(() => {
    store = mockStore(initialState)
  })

  afterEach(() => {
    store.clearActions()
  })

  //There's some bug with mockAxios maybe? This should work but doesn't
  //Collin said to leave it alone and not test this for now

  // describe('fetchOrders', () => {
  //   it('eventually dispatches the GET_ORDERS action', () => {
  //     const fakeOrders = [{ orderDate: new Date(), userId: 5 }]
  //     mockAxios.onGet('/api/orders').reply(200, fakeOrders)
  //     return store.dispatch(fetchOrders())
  //       .then(() => {
  //         const actions = store.getActions()
  //         expect(actions[0].type).to.be.equal('GET_ORDERS')
  //         expect(actions[0].orders).to.be.deep.equal(fakeOrders)
  //       })
  //   })
  // })

})

describe('action creators', () => {

  it('clearOrders should return the correct action', () => {
      expect(clearOrders()).to.be.deep.equal(
        {
          type: 'CLEAR_ORDERS',
        }
      );
  })
})

