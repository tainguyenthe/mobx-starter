import Common from '../stores/Common2'
import Account from '../stores/Account2'
import Todos from '../stores/Todos2'

export default (state) => (
  {
    state,
    store: {
      common: new Common(state),
      account: new Account(state),
      todos: new Todos(state),
    }
  }
)
