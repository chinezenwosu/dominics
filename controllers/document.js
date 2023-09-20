const redis = require('../redis');

const DocumentController = (function() {
  const _handleError = (e) => {
    console.log('error in document controller', e)
  }

  const _createOrUpdateDocument = async (key, val) => {
    await redis.set(key, JSON.stringify(val))
  }

  const updateDocument = async (key, val) => {
    try {
      await _createOrUpdateDocument(key, val)
    }
    catch (e) {
      _handleError(e)
    }
  }

  const getOrCreateDocument = async (key) =>  {
    try {
      const document =  await redis.get(key)
      const initialValue = '{}'

      if (document === undefined) {
        await _createOrUpdateDocument(key, initialValue)
      }
  
      return JSON.parse(document || initialValue)
    }
    catch (e) {
      _handleError(e)
    }
  }

  return {
    updateDocument,
    getOrCreateDocument,
  }
})()

module.exports = DocumentController
