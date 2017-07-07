import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { useStaticRendering } from 'mobx-react'
import Html from '../../src/components/common/Html'
import Index from '../../src/pages/Index'
import preload from '../../src/config/routes'

useStaticRendering(true)

// Server-side render
export default async(ctx, next) => {

  const branches = matchRoutes(preload, ctx.url)
  // const promises = branches.map(({ route, match }) => {
  //   return route.onEnter
  //     ? route.onEnter(ctx.context, match.params)
  //     : Promise.resolve(null)
  // })
  // await Promise.all(promises)

  const context = {}
  const html = (
    <StaticRouter location={ctx.url} context={context}>
      <Html state={ctx.context.state}>
        <Index {...ctx.context}/>
      </Html>
    </StaticRouter>
  )
  // const html = (
  //   <StaticRouter location={ctx.url} context={context}>
  //     <Index {...ctx.context}>
  //       {renderRoutes(branches)}
  //     </Index>
  //   </StaticRouter>
  // )

  // const html = (
  //   <StaticRouter location={ctx.url} context={context}>
  //     <Html state={ctx.context.state}>
  //       {component}
  //     </Html>
  //   </StaticRouter>
  // )

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    ctx.redirect(context.url)
    ctx.body = '<!DOCTYPE html>redirecting'
    return await next()
  }

  ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(html)
}
