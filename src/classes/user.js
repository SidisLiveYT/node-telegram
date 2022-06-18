const Chat = require('./chat')

class User {
  constructor(metadata, extraMetadata) {
    this.resolveHttpResponse(metadata, extraMetadata)
  }

  resolveHttpResponse(metadata, extraMetadata) {
    this.id = metadata?.id
    this.isBot = Boolean(metadata?.is_bot)
    this.firstName = metadata?.first_name
    this.LastName = metadata?.last_name
    this.userName = metadata?.username
    this.languageCode = metadata?.language_code
    this.canJoinGroups = Boolean(metadata?.can_join_groups)
    this.canReadAllGroupMessages = Boolean(
      metadata?.can_read_all_group_messages,
    )
    this.supportsInlineQueries = Boolean(metadata?.supports_inline_queries)
    this.chat = extraMetadata?.chat ? new Chat(extraMetadata?.chat) : undefined
  }
}

module.exports = User
