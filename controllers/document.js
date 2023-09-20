const redis = require('../redis');

class DocumentController {
  _handleError (e) {
    console.log('error in document controller', e)
  }

  async _createOrUpdateDocument(key, val) {
    await redis.set(key, JSON.stringify(val))
  }

  async updateDocument(key, val) {
    try {
      await this._createOrUpdateDocument(key, val)
    }
    catch (e) {
      this._handleError(e)
    }
  }

  async getOrCreateDocument(key) {
    try {
      const document =  await redis.get(key)
      const initialValue = '{}'

      if (document === undefined) {
        await this._createOrUpdateDocument(key, initialValue)
      }
  
      return JSON.parse(document || initialValue)
    }
    catch (e) {
      this._handleError(e)
    }
  }
}

module.exports = DocumentController
