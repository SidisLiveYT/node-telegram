const Audio = require('./audio')

class Animation {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.fileMetadata = {
      id: metadata?.file_id,
      uniqueId: metadata?.file_unique_id,
      name: metadata?.file_name,
      size: metadata?.file_size,
      mimeType: metadata?.mime_type,
    }
    this.width = metadata?.width
    this.height = metadata?.height
    this.duration = metadata?.duration
    this.thumbnail = metadata?.thumb?.file_id
      ? {
        file: {
          id: metadata?.thumb?.file_id,
          uniqueId: metadata?.thumb?.file_unique_id,
          size: metadata?.thumb?.file_size,
        },
        width: metadata?.thumb?.width,
        height: metadata?.thumb?.height,
      }
      : undefined
    this.audioMetadata = metadata?.audio
      ? new Audio(metadata?.audio)
      : undefined
  }
}
module.exports = Animation
