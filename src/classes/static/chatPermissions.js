class ChatPermissions {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.canSendMessages = Boolean(metadata?.can_send_messages)
    this.canSendMediaMessages = Boolean(metadata?.can_send_media_messages)
    this.canSendPolls = Boolean(metadata?.can_send_polls)
    this.canSendOtherMessages = Boolean(metadata?.can_send_other_messages)
    this.canAddWebPagePreviews = Boolean(metadata?.can_add_web_page_previews)
    this.canChangeInfo = Boolean(metadata?.can_change_info)
    this.canInviteUsers = Boolean(metadata?.can_invite_users)
    this.canPingMessages = Boolean(metadata?.can_pin_messages)
  }
}
module.exports = ChatPermissions
