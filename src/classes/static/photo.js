class Photo {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.smallFile = {
      id: metadata?.small_file_id,
      uniqueId: metadata?.small_file_unique_id,
    }
    this.bigFile = {
      id: metadata?.big_file_id,
      uniqueId: metadata?.big_file_unique_id,
    }
  }
}
module.exports = Photo
