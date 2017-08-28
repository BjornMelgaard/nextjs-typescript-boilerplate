const express = require('express')
const next = require('next')
const moduleAlias = require('module-alias')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

moduleAlias.addAlias('components', path.resolve(ROOT_PATH, '../.next/dist/app/components'))
moduleAlias.addAlias('containers', path.resolve(ROOT_PATH, '../.next/dist/app/containers'))

app.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

