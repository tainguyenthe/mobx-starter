import React from 'react'

export default class Html extends React.Component {
  render() {
    const { state, children } = this.props
    const devServerURL = process.env.DEV ? `http://${global.HOSTNAME}:2002` : ''

    return (
      <html>
      <head>
        <meta charSet="utf-8"/>
        <title>{state.common.title}</title>
        <meta name="title" content={state.common.title}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico"/>

        {/* Bundled CSS */}
        <link href={devServerURL + '/build/bundle.css'} rel="stylesheet"/>

        {/* SSR State*/}
        <script dangerouslySetInnerHTML={{
          __html: 'window.__STATE = ' + JSON.stringify(state, null, process.env.DEV ? 4 : 0) + ';'
        }}/>
      </head>
      <body>

        {/* Our content rendered here */}
        <div id="container">
          {children}
        </div>

        {/* Bundled JS */}
        <script async src={devServerURL + '/build/bundle.js'}/>
      </body>
      </html>
    )
  }
}
