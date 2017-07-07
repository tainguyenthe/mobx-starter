import { size, find } from 'lodash'

/**
 * @class Account
 */
export default (state, request) => {
  return new class Account {

    isLoggedIn() {
      return size(state.account.username)
    }

    find(username) {
      return find(state.account.users, { username })
    }

    login(params) {
      return request.post('api/account/login', params).then(account => {
        state.account = account
      })
    }

    async logout() {
      await request.get('api/account/logout')
      state.account.username = null
      state.account.token = null
      return Promise.resolve()
    }

    register(params) {
      return request.post('api/account/register', params).then(account => {
        state.account = account
      })
    }
  }
}
