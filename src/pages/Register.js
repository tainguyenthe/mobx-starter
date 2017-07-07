import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import Error from '../components/common/Error'

@inject('store')
@observer
class Register extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ state }) {
    state.common.title = 'Register'
  }

  @observable form = {
    username: '',
    password: '',
    errorMsg: null,
    loading: false
  }

  handleChange = (key) => (e) => {
    this.form[key] = e.target.value
  }

  handleSubmit = async(e) => {
    e.preventDefault()
    await this.handleRegister()
  }

  handleRegister = async() => {
    const { store } = this.props
    const form = this.form
    const { username, password } = form
    const { router } = this.context

    form.errorMsg = null
    form.loading = true

    try {
      await store.account.register({
        username,
        password
      })
      await store.account.login({
        username,
        password
      })
      router.history.push('/')
    } catch(error) {
      form.errorMsg = error
      form.loading = false
    }
  }

  render() {
    const form = this.form
    return <main>
      <h1>register</h1>
      <form className="account" onSubmit={this.handleSubmit}>
        <label>
          Username
          <input type="text"
                 required
                 onInput={this.handleChange('username')}
                 value={form.username}
          />
        </label>

        <label>
          Password
          <input type="password"
                 required
                 onInput={this.handleChange('password')}
                 autoComplete="new-password"
                 value={form.password}
          />
        </label>

        {form.loading
          ? <button disabled>Loading</button>
          : <button type="submit">Register</button>
        }

        {form.errorMsg && <Error text={form.errorMsg}/>}
      </form>
    </main>
  }
}

export default Register
