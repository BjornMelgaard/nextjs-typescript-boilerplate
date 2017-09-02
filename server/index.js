const express = require('express')
const next = require('next')
const moduleAlias = require('module-alias')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const paths = require('./paths')

// XXX must be synced with tsconfig paths
moduleAlias.addAlias('components', paths.inDotNextDir('dist/app/components'))
moduleAlias.addAlias('containers', paths.inDotNextDir('dist/app/containers'))

app.prepare()
.then(() => {
  const server = express()
  server.use('/_next/static', express.static(paths.inDotNextDir('static')))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

