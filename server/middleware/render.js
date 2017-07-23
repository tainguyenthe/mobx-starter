import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import Html from '../../src/components/common/Html'
import Index from '../../src/pages/Index'
import routes from '../../src/config/routes'

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
  const html = (
    <StaticRouter location={ctx.url} context={context}>
      <Html state={ctx.context.state}>
        <Index {...ctx.context}/>
      </Html>
    </StaticRouter>
  )

  // This will contain the URL to redirect to if <Redirect> was used
  if (context.url) {
    ctx.redirect(context.url)
    ctx.body = '<!DOCTYPE html>redirecting'
    return await next()
  }

  ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(html)
}
