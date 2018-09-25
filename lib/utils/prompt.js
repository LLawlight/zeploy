const read = require('read')

module.exports = (msg) => {
  return new Promise((resolve, reject) => {
    read({
      prompt: msg
    }, (err, res) => {
      if (err) return reject(err)

      resolve(res)
    })
  })
}