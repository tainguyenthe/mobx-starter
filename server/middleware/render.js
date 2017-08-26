import fs from 'fs'
import { resolve } from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import Index from '../../src/pages/Index'
import config from '../config'
import routes from '../../src/config/routes'

const indexHTML = fs.readFileSync(resolve(__dirname, '../../src/pages/index.html'), 'utf8')

// Server-side render
export default async(ctx, next) => {

  const branches = matchRoutes(routes, ctx.url)
  const promises = branches.map(({ route, match }) => {
    return route.component.onEnter
      ? route.component.onEnter(ctx.context, match.params)
      : Promise.resolve(null)
  })
  await Promise.all(promises)

  const context = {}
  const components = renderToStaticMarkup(
    <StaticRouter location={ctx.url} context={context}>
      <Index {...ctx.context}/>
    </StaticRouter>
  )

  // This will contain the URL to redirect to if <Redirect> was used
  if (context.url) {
    ctx.redirect(context.url)
    ctx.body = '<!DOCTYPE html>redirecting'
    return await next()
  }

  const bundleURL = config.server.DEV ? `//localhost:2002` : ''

  ctx.body = indexHTML
    .replace(/{bundleURL}/g, bundleURL)
    .replace('{title}', ctx.context.state.common.title)
    .replace('{state}', JSON.stringify(ctx.context.state, null, 2))
    .replace('{children}', components)
}
