// This is the entry point for our client-side logic
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/logger'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import state from '../stores/State'
import autorun from './autorun'
import createContext from './context'
import routes from './routes'
import Index from '../pages/Index'

// We render our react app into this element
const container = document.getElementById('container')
const context = createContext(state)

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

if (process.env.NODE_ENV !== 'production') {
  require('mobx-logger').enableLogging({
    action: true,
    reaction: false,
    transaction: true,
    compute: false
  })
}

// Hot-reloading
if (module.hot) {
  module.hot.accept()
}
