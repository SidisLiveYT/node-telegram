const Location = require('./location')

class ChatLocation {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.location = metadata?.location
      ? new Location(metadata?.location)
      : undefined
    this.address = metadata?.address
  }
}
module.exports = ChatLocation
