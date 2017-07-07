import requestClient from 'core/request'
import common from '../stores/common'
import todos from '../stores/todos'
import account from '../stores/account'

// All our actions are listed here
export default (injectedState) => {
  const token = injectedState.account && injectedState.account.token
  const request = requestClient(token)

  return {
    common: common(injectedState, request),
    todos: todos(injectedState, request),
    account: account(injectedState, request)
  }
}
