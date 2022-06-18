class Location {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.longitude = metadata?.longitude
    this.latitude = metadata?.latitude
    this.horizontalAccuracy = metadata?.horizontal_accuracy
    this.livePeriod = metadata?.live_period
    this.heading = metadata?.heading
    this.proximityAlertRadius = metadata?.proximity_alert_radius
  }
}
module.exports = Location
