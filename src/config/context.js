import Common from '../stores/Common'
import Account from '../stores/Account'
import Todos from '../stores/Todos'

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
