const { Server } = require('socket.io')
const config = require('./config')
const DocumentController = require('./controllers/document')

const io = new Server({
  cors: {
    origin: `http://localhost:${config.port.app}`,
    methods: ['GET', 'POST'],
  }
})

const documentController = new DocumentController()

io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    const data = await documentController.getOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit('load-document', data)

    socket.on('send-document-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-document-changes', delta)
    })

    socket.on('save-document', async (data) => {
      await documentController.updateDocument(documentId, data)
    })
  })
})

io.listen(config.port.socket, () => {
  console.log(`Websocket is running on ${config.port.socket}`)
})

module.exports = io
