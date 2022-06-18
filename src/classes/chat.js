const ChatPermissions = require('./static/chatPermissions')
const ChatLocation = require('./static/chatLocation')
const Message = require('./message')
const Photo = require('./static/photo')

class Chat {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.id = metadata?.id
    this.type = metadata?.type
    this.title = metadata?.title
    this.userName = metadata?.username
    this.firstName = metadata?.first_name
    this.lastName = metadata?.last_name
    this.photo = metadata?.photo ? new Photo(metadata?.photo) : undefined
    this.bio = metadata?.bio
    this.hasPrivateforwars = Boolean(metadata?.has_private_forwards)
    this.description = metadata?.description
    this.inviteLink = metadata?.invite_link
    this.pinnedMessage = metadata?.pinned_message
      ? new Message(metadata?.pinned_message)
      : undefined
    this.permissions = metadata?.permissions
      ? new ChatPermissions(metadata?.permissions)
      : undefined
    this.messageAutoDeleteTimeout = {
      ms: metadata?.message_auto_delete_time,
      readable: new Date(metadata?.message_auto_delete_time),
    }
    this.hasProtectedContent = Boolean(metadata?.has_protected_content)
    this.stickerSetName = metadata?.sticker_set_name
    this.canSetStickenSet = Boolean(metadata?.can_set_sticker_set)
    this.linkedChatId = metadata?.linked_chat_id
    this.location = metadata?.location
      ? new ChatLocation(metadata?.location)
      : undefined
  }
}
module.exports = Chat
