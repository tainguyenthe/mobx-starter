import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import routes from '../config/routes'
import Menu from '../components/common/Menu'
import NotFound from './NotFound'

class Index extends React.Component {
  render() {
    // Wrapping with provider gives children access to stores
    return (
      <Provider {...this.props}>
        <div>
          <Menu/>
          <Switch>
            {routes.map((route, i) => {
              return <Route key={i} exact path={route.path} component={route.component}/>
            })}
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Provider>
    )
  }
}

Index.propTypes = {
  store: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
}

export default Index
