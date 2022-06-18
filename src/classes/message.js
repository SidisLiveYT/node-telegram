const Chat = require('./chat')
const MessageEntity = require('./static/messageEntity')
const User = require('./user')

class Message {
  constructor(metadata) {
    this.resolveHttpResponse(metadata)
  }

  resolveHttpResponse(metadata) {
    this.id = metadata?.message_id
    this.user = metadata?.from
      ? new User(
        { ...metadata?.from, bot: metadata?.bot },
        metadata?.sender_chat
          ? {
            chat: new Chat({
              ...metadata?.sender_chat,
              bot: metadata?.bot,
            }),
          }
          : undefined,
      )
      : undefined
    this.chat = metadata?.chat
      ? new Chat({
        ...metadata?.chat,
        bot: metadata?.bot,
      })
      : undefined
    this.timestamp = {
      ms: metadata?.date,
      readable: metadata?.date ? new Date(metadata?.date) : 0,
    }
    this.forward = {
      user: metadata?.forward_from
        ? new User(
          { ...metadata?.forward_from, bot: metadata?.bot },
          metadata?.forward_from_chat
            ? {
              chat: new Chat({
                ...metadata?.forward_from_chat,
                bot: metadata?.bot,
              }),
            }
            : undefined,
        )
        : undefined,
      message: metadata?.forward_from_message_id
        ? new Message({
          id: metadata?.forward_from_message_id,
          bot: metadata?.bot,
        })
        : undefined,
      signature: metadata?.forward_signature,
      senderName: metadata?.forward_sender_name,
      timestamp: {
        ms: metadata?.forward_date,
        readable: metadata?.forward_date ? new Date(metadata?.forward_date) : 0,
      },
      automatic: Boolean(metadata?.is_automatic_forward),
    }
    this.replyTo = metadata?.reply_to_message
      ? new Message({
        ...metadata?.reply_to_message,
        bot: metadata?.bot,
      })
      : undefined
    this.viaBot = metadata?.via_bot
      ? new User({ ...metadata?.via_bot, bot: metadata?.bot })
      : undefined
    this.editTimestamps = {
      ms: metadata?.edit_date,
      readable: metadata?.edit_date ? new Date(metadata?.edit_date) : 0,
    }
    this.protectedContent = Boolean(metadata?.has_protected_content)
    this.groupId = metadata?.media_group_id
    this.postAuthorSignature = metadata?.post_author_signature
    this.content = metadata?.text
    this.entities =
      metadata?.entities &&
      Array.isArray(metadata?.entities) &&
      metadata?.entities?.length > 0
        ? metadata?.entities?.map((entity) => new MessageEntity(entity))
        : []
    this.animation = metadata?.animation
  }
}

module.exports = Message
