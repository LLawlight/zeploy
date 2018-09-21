const chalk = require('chalk')

module.exports = (cmd, env) => {
  switch(cmd) {
    case 'config':
    require('./lib/config')(env)
    break
    case 'publish':
    require('./lib/publish')(env)
    break
    case 'rollback':
    console.log('rollback')
    break
    default:
    console.log(`${chalk.red(`${chalk.yellow(cmd)} is not exist`)}`)
  }
}