import { useStaticRendering } from 'mobx-react'
import Account from '../models/Account'
import state from '../../src/stores/State2'
import context from '../../src/config/context'

useStaticRendering(true)

/**
 * Middleware for creating the context
 * @param ctx
 * @param next
 */
export default async(ctx, next) => {
  // Get our token from headers (server) or cookies (client)
  ctx.token = ctx.headers['token'] || ctx.cookies.get('token')

  // Check if logged in
  ctx.account = await Account.getAccount(ctx.token)

  // Create state for SSR
  ctx.context = context(Object.assign({}, state))

  console.warn(ctx.context.state.account)

  if (ctx.account.id) {
    ctx.context.state.account = ctx.account
  }

  await next()
}
