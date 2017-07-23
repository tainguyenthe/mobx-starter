/**
 * Bootstrap core and webpack
 */
require('./logger')
require('./polyfills')

require('babel-register')
require('../server/server')
