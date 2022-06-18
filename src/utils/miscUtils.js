const Axios = require('axios').default

class miscUtils {
  /**
   * getHtmlData() -> Fetch response.text() for Working on HTML/Rest - API Request Manupulation/Manager Stuff
   * @param {string} rawHtmlUrl Raw Telegram Get/POST Request Url
   * @param {object} htmlRequestOption html get Request Options for Axios get fetch method
   * @param {string | void} method HTTP Request for Axios | Bydefault its GET Request handler
   * @param {boolean | void} ignoreRejection Ignore the Response.status code !== '200' if possible
   * @returns {Promise<string|void>} returns response.text() as Data for Raw HTML Data of Youtube Watch Page
   */
  static async getHtmlData(
    rawHtmlUrl,
    htmlRequestOption,
    method = 'GET',
    ignoreRejection = false,
  ) {
    return new Promise(async (resolve, reject) => {
      await Axios({
        ...htmlRequestOption,
        url: rawHtmlUrl,
        method: method?.toUpperCase()?.trim(),
      })
        .then((response) => {
          if (!response.ok && response.status !== 200 && !ignoreRejection)
            throw new Error(
              `Rejected GET Request with status code: ${response.status}`,
            )
          else if (!response.ok && response.status !== 200) return false
          else return response.data ?? response.text()
        })
        .then((rawHtmlData) => resolve(rawHtmlData))
        .catch((error) => resolve(error?.data ?? error))
    })
  }
}

module.exports = miscUtils
