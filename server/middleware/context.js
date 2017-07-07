import { getAccount } from '../routes/account';
import stores from '../../src/config/stores'
import state from '../../src/stores/state'

/**
 * Middleware for creating the context
 * @param ctx
 * @param next
 */
export default async(ctx, next) => {
  // Get our token from headers (server) or cookies (client)
  ctx.token = ctx.headers['token'] || ctx.cookies.get('token')

  // Empty state for SSR
  ctx.context = {
    store: stores(state),
    state: state
  }

  // Check if logged in
  const account = await getAccount(ctx.token)
  if (account) {
    ctx.context.state.account = account
  }

  await next()
}
