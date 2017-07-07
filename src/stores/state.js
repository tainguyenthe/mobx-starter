import { observable } from 'mobx'

class State {

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

export default new State()
