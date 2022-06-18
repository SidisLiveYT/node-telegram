const EventEmitter = require('events').EventEmitter

const { getHtmlData } = require('../utils/miscUtils')
const Chat = require('./chat')
const Message = require('./message')
const User = require('./user')
const Collector = require('./collector')

class TelegramBot extends EventEmitter {
  static defaultCredentials = { botBaseApiUri: 'https://api.telegram.org/bot' }

  #__authorizationToken

  constructor(authorizationToken, options) {
    super()
    this.#__authorizationToken = authorizationToken
  }

  async sendMessage(chatId, rawText, filters) {
    if (!this.loggedIn)
      return this.emit(
        'error',
        '[BOT_NOT_LOGIN] - Telegram bot isnt Login using login(authorizationToken) function',
        this,
      )
    else if (!(chatId && typeof chatId === 'string' && chatId?.trim() !== ''))
      return this.emit(
        'error',
        '[INVALID_CHAT_ID] - Telegram Chat Id is wrong or not in a acceptable Format',
        this,
      )
    else if (
      !(rawText && typeof rawText === 'string' && rawText?.trim() !== '')
    )
      return this.emit(
        'error',
        '[INVALID_TEXT_FORMAT] - Telegram Send Message Text is wrong or not in a acceptable Format',
        this,
      )

    const messageMetdata = await getHtmlData(
      `${this.botApiUrl}/sendMessage`,
      { data: { chat_id: chatId?.trim(), text: rawText?.trim() } },
      'POST',
    )
    if (!messageMetdata)
      return this.emit(
        'error',
        '[INVALID_MESSAGE_METADATA] - Invalid Message Metadata has been received',
        messageMetdata,
      )
    else
      return new Message({
        ...(messageMetdata?.result ?? messageMetdata),
        bot: this,
      })
  }

  async getChat(chatId) {
    if (!this.loggedIn)
      return this.emit(
        'error',
        '[BOT_NOT_LOGIN] - Telegram bot isnt Login using login(authorizationToken) function',
        this,
      )
    else if (
      !(
        chatId &&
        typeof chatId === 'string' &&
        chatId?.trim() !== '' &&
        chatId?.trim()?.startsWith('@')
      )
    )
      return this.emit(
        'error',
        '[INVALID_CHAT_ID] - Telegram Chat Id is wrong or not in a acceptable Format',
        this,
      )
    const chatMetadata = await getHtmlData(
      `${this.botApiUrl}/getChat`,
      { data: { chat_id: chatId?.trim() } },
      'GET',
    )
    if (!chatMetadata)
      return this.emit(
        'error',
        '[INVALID_CHAT_METADATA] - Invalid Fetched Chat Metadata has been received',
        chatMetadata,
      )
    else
      return new Chat({ ...(chatMetadata?.result ?? chatMetadata), bot: this })
  }

  async logOut() {
    if (!(this.loggedIn && this.botApiUrl))
      return this.emit(
        'error',
        '[BOT_NOT_LOGIN] - Telegram bot isnt Login using login(authorizationToken) function',
        this,
      )
    const botMetadata = await getHtmlData(`${this.botApiUrl}/getMe`, {}, 'GET')
    if (!botMetadata)
      return this.emit(
        'error',
        '[INVALID_BOT_METADATA] - Invalid Bot Metadata has been received',
        botMetadata,
      )
    else this.resolveHttpResponse({ signStatus: false })
    return this
  }

  async login(authorizationToken = this.#__authorizationToken) {
    if (
      !(
        authorizationToken &&
        typeof authorizationToken === 'string' &&
        authorizationToken !== ''
      )
    )
      return this.emit(
        'error',
        '[INVALID_BOT_TOKEN] - Invalid Bot authorization token has been provided',
        authorizationToken,
      )
    else this.#__authorizationToken = authorizationToken
    const botMetadata = await getHtmlData(`${this.botApiUrl}/getMe`, {}, 'GET')
    if (!botMetadata)
      return this.emit(
        'error',
        '[INVALID_BOT_METADATA] - Invalid Bot Metadata has been received',
        authorizationToken,
      )
    else
      this.resolveHttpResponse({
        signStatus: true,
        ...(botMetadata?.result ?? botMetadata),
      })
    return this
  }

  get botApiUrl() {
    if (
      !(
        this.#__authorizationToken &&
        typeof this.#__authorizationToken === 'string' &&
        this.#__authorizationToken !== ''
      )
    )
      return this.emit(
        'error',
        '[INVALID_BOT_TOKEN] - Invalid Bot authorization token has been provided',
        this.#__authorizationToken,
      )
    return (
      TelegramBot.defaultCredentials.botBaseApiUri + this.#__authorizationToken
    )
  }

  resolveHttpResponse(metadata) {
    this.id = metadata?.id ?? this.id
    this.bot = Boolean(metadata?.is_bot) ?? this.bot
    this.firstName = metadata?.first_name ?? this.firstName
    this.userName = metadata?.username ?? this.userName
    this.canJoinGroups =
      Boolean(metadata?.can_join_groups) ?? this.canJoinGroups
    this.canReadAllGroupMessages =
      Boolean(metadata?.can_read_all_group_messages) ??
      this.canReadAllGroupMessages
    this.supportsInlineQueries =
      Boolean(metadata?.supports_inline_queries) ?? this.supportsInlineQueries
    this.loggedIn = Boolean(metadata?.signStatus)
  }
}

module.exports = TelegramBot
