import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Loading from '../components/common/Loading'

@inject('store')
@observer
class Logout extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ state }) {
    state.common.title = 'Logout'
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    loading: false
  }

  handleLogout = () => {
    const { store } = this.props
    const { router } = this.context

    this.setState({
      loading: true
    })
    new Promise(resolve => setTimeout(resolve, 500))
      .then(() => store.account.logout())
      .then(() => router.history.push('/'))
  }

  render() {
    const { loading } = this.state

    return <main>
      <div className="account">
        <h3>Do you want to log out ?</h3>
        <p>This will disconnect you and you will have to login again next time.</p>

        {loading
          ? <Loading/>
          : <button onClick={this.handleLogout}>Logout</button>
        }
      </div>
    </main>
  }
}

export default Logout
