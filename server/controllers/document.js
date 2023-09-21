const redis = require('../redis');

const DocumentController = (function() {
  const _handleError = (e) => {
    console.log('error in document controller', e)
  }

  const _createOrUpdateDocument = async (key, field, val) => {
    await redis.hSet(key, field, JSON.stringify(val));
  }

  const _updateDocument = async (key, field, val) => {
    await _createOrUpdateDocument(key, field, val)
  }

  const updateDocumentContent = async (key, val) => {
    try {
      await _updateDocument(key, 'content', val)
    }
    catch (e) {
      _handleError(e)
    }
  }

  const updateDocumentName = async (key, val) => {
    try {
      await _updateDocument(key, 'name', val)
    }
    catch (e) {
      _handleError(e)
    }
  }

  const getDocument = async (key, field) =>  {
    try {
      const document = await redis.hGetAll(key)
      const initialValue = '""'

      const formattedDocument = {
        content: JSON.parse(document.content || initialValue),
        name: JSON.parse(document.name || initialValue),
      }

      return formattedDocument
    }
    catch (e) {
      _handleError(e)
    }
  }

  return {
    updateDocumentContent,
    updateDocumentName,
    getDocument,
  }
})()

module.exports = DocumentController
