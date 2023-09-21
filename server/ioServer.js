const { Server } = require('socket.io')
const config = require('../config')
const DocumentController = require('./controllers/document')

const io = new Server({
  cors: {
    origin: `http://localhost:${config.port.app}`,
    methods: ['GET', 'POST'],
  }
})

// Also update socketEmissions in /src/pages/Document/index.jsx
const socketEmissions = {
  GET_DOCUMENT: 'GET_DOCUMENT',
  LOAD_DOCUMENT: 'LOAD_DOCUMENT',
  SEND_DOCUMENT_CONTENT_CHANGES: 'SEND_DOCUMENT_CONTENT_CHANGES',
  SEND_DOCUMENT_NAME_CHANGES: 'SEND_DOCUMENT_NAME_CHANGES',
  RECEIVE_DOCUMENT_CONTENT_CHANGES: 'RECEIVE_DOCUMENT_CONTENT_CHANGES',
  RECEIVE_DOCUMENT_NAME_CHANGES: 'RECEIVE_DOCUMENT_NAME_CHANGES',
  SAVE_DOCUMENT_CONTENT: 'SAVE_DOCUMENT_CONTENT',
  SAVE_DOCUMENT_NAME: 'SAVE_DOCUMENT_NAME',
}

io.on('connection', (socket) => {
  socket.on(socketEmissions.GET_DOCUMENT, async (documentId) => {
    const data = await DocumentController.getDocument(documentId)
    socket.join(documentId)
    socket.emit(socketEmissions.LOAD_DOCUMENT, data)

    socket.on(socketEmissions.SEND_DOCUMENT_CONTENT_CHANGES, (delta) => {
      socket.broadcast.to(documentId).emit(socketEmissions.RECEIVE_DOCUMENT_CONTENT_CHANGES, delta)
    })

    socket.on(socketEmissions.SEND_DOCUMENT_NAME_CHANGES, (data) => {
      socket.broadcast.to(documentId).emit(socketEmissions.RECEIVE_DOCUMENT_NAME_CHANGES, data)
    })

    socket.on(socketEmissions.SAVE_DOCUMENT_CONTENT, async (data) => {
      await DocumentController.updateDocumentContent(documentId, data)
    })

    socket.on(socketEmissions.SAVE_DOCUMENT_NAME, async (data) => {
      await DocumentController.updateDocumentName(documentId, data)
    })
  })
})

io.listen(config.port.socket, () => {
  console.log(`Websocket is running on ${config.port.socket}`)
})

module.exports = io
