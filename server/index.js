const express = require('express')
const next = require('next')
const moduleAlias = require('module-alias')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const utils = require('./utils')

moduleAlias.addAlias('components', utils.inDotNextDir('dist/app/components'))
moduleAlias.addAlias('containers', utils.inDotNextDir('dist/app/containers'))

app.prepare()
.then(() => {
  const server = express()
  server.use('/_next/static', express.static(utils.inDotNextDir('static')))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

