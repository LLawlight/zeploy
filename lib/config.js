const fs = require('fs')
const path = require('path')
const ora = require('ora')
const msg = require('./utils/msg')

const configTemplate = {
  ssh: {
    host: '',
    username: '',
    password: ''
  },
  distPath: '',
  targetPath: ''
}

module.exports = (env) => {
  const spinner = ora('正在生成配置文件...').start()

  const rcPath = path.resolve('.zeployrc')

  let oldConfig = {}

  if (fs.existsSync(rcPath)) {
    oldConfig = JSON.parse(fs.readFileSync(rcPath, 'utf-8'))
  }

  if (oldConfig[env]) {
    spinner.fail(`${msg.fail('当前配置已经存在！')}`)
  }
  else {
    const newConfig = Object.assign({
      [env]: configTemplate
    }, oldConfig)
  
    fs.writeFileSync(rcPath, JSON.stringify(newConfig, null, 2))
  
    spinner.succeed(`${msg.success('配置生成成功！')}`)
  }
}