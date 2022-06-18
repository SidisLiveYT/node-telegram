const User = require('./user')

class MessageEntity {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.type = metadata?.type
    this.offSet = metadata?.offset
    this.length = metadata?.length
    this.url = metadata?.url
    this.user = metadata?.user ? new User(metadata?.user) : undefined
    this.language = metadata?.language
  }
}

module.exports = MessageEntity
