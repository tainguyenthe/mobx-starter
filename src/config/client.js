// This is the entry point for our client-side logic
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/logger'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import stores from './stores'
import state from '../stores/state'
import autorun from './autorun'
import Index from '../pages/Index'

// We render our react app into this element
const container = document.getElementById('container')
const context = {
  store: stores(state),
  state: state
}

console.warn(context)

// React to changes
autorun(context)

// Render HTML on the browser
render(<AppContainer>
  <BrowserRouter>
    <Index {...context}>
      {routes}
    </Index>
  </BrowserRouter>
</AppContainer>, container)

// Hot-reloading
if (module.hot) {
  module.hot.accept()
}
