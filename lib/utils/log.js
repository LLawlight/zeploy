const msg = require('./msg')

module.exports = {
  success: (text) => {
    console.log(msg.success(text))
  },

  warn: (text) => {
    console.log(msg.warn(text))
  },

  fail: (text) => {
    console.log(msg.fail(text))
  },
}