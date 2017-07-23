require('./logger')

const {fork} = require('child_process')
const watchDirs = ['./server/**', './core/**/*.js']

process.env.NODE_ENV = 'development'
process.env.DEV = false
process.argv.slice(2).forEach(arg => {
  if (arg === '--prod') {
    process.env.NODE_ENV = 'production'
    process.env.DEV = true
  }
})

console.server('Environment: ' + process.env.NODE_ENV)

if (process.env.DEV) {
  // Run server
  const chokidar = require('chokidar')
  const watcher = chokidar.watch(watchDirs)

  let server = fork('./core/server')

  watcher.on('ready', function() {
    watcher.on('all', function() {
      server.kill()
      server.on('exit', function() {
        console.server('✓ SERVER RESTART')
        server = fork('./core/server')
      })
    })
  })
  // Run webpack
  require('../webpack.dev.js')
} else {
  // Run server
  require('./polyfills')
  require('babel-register')
  require('../server/server')

  // Run webpack
  fork('./webpack.prod.js')
}
