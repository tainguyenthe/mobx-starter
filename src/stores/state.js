import { observable, extendObservable } from 'mobx'
/**
 * @class State
 * This is our state, we modifity it
 * using the methods from other stores
 */
class State {

  constructor(injectedState) {
    extendObservable(this, injectedState)
  }

  @observable account = {
    username: null,
    token: null,
    users: []
  }

  @observable common = {
    title: 'Mobx-starter',
    statusCode: 200,
    hostname: 'localhost'
  }

  @observable todos = []
}

export default process.env.BROWSER ? new State(window.__STATE) : new State({})
