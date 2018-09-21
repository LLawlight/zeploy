const shelljs = require('shelljs')
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const msg = require('./utils/msg')

module.exports = (env) => {
  const spinner = ora('正在生成配置文件...').start()

  const configDir = path.resolve('zeploy')
  const configPath = path.resolve('zeploy', `${env}.js`)
  
  if (fs.existsSync(configPath)) {
    spinner.fail(`${msg.fail('此配置文件已存在！')}`)
  }
  else {
    shelljs.mkdir('-p', configDir)
    shelljs.touch(configPath)
    spinner.succeed(`${msg.success('配置生成成功！')}`)
  }
}
