const coap = require('coap')
const server = coap.createServer()
const query = require('./query')
const { createQuery, parseQuery, writeToFile, log } = require('./helper')

server.on('request', (req, res) => {
  const query = parseQuery(req.url)
  writeToFile(query)
  log('FILE_WRITTEN')
  console.log(req.url)
  res.end(JSON.stringify({success: true}))
})

// the default CoAP port is 5683
server.listen(() => {
  const req = coap.request({
    host: 'localhost',
    pathname: '/path',
    query: createQuery(query),
    body: 'test',
    method: 'POST'
  })

  req.on('response', (res) => {
    res.pipe(process.stdout)
    res.on('end', () => {
      process.exit(0)
    })
  })

  req.end()
})