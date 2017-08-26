import {size, find} from 'lodash'
import state from './State'

export default class Account {

  constructor(request) {
    this.request = request
  }

  isLoggedIn() {
    console.log(state.account.username)
    return size(state.account.username)
  }

  find(username) {
    return find(state.account.users, { username })
  }

  login(params) {
    return this.request.post('api/account/login', params).then(account => {
      state.account = account
    })
  }

  async logout() {
    await this.request.get('api/account/logout')
    state.account.username = null
    state.account.token = null
    return Promise.resolve()
  }

  register(params) {
    return this.request.post('api/account/register', params).then(account => {
      state.account = account
    })
  }
}

