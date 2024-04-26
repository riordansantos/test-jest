import { createServer } from 'node:http'
import { once } from 'node:events'
const server = createServer(async (request, response) => {
  if (request.method !== 'POST' || request.url !== '/persons') {
    response.writeHead(404)
    response.end()
    return
  }
  try {
    const data = await once(request, 'data')
    console.log('data', data)
  } catch (error) {
    console.error('deu ruim', error)
    response.writeHead(500)
    response.end('hello')
  }
})

export default server
