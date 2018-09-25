const fs = require('fs')
const path = require('path')
const prompt = require('./utils/prompt')
const log = require('./utils/log')

const configTemplate = {
  ssh: {
    host: '',
    username: '',
    password: ''
  },
  distPath: '',
  targetPath: ''
}

module.exports = async (env) => {
  const rcPath = path.resolve('.zeployrc')

  let oldConfig = {}

  if (fs.existsSync(rcPath)) {
    oldConfig = JSON.parse(fs.readFileSync(rcPath, 'utf-8'))
  }

  if (oldConfig[env]) {
    log.fail('当前配置已经存在！')
  }
  else {
    try {
      configTemplate.ssh.host = await prompt('ssh.host:')
      configTemplate.ssh.username = await prompt('ssh.username:')
      configTemplate.ssh.password = await prompt('ssh.password:')
      configTemplate.distPath = await prompt('distPath:')
      configTemplate.targetPath = await prompt('targetPath:')
    }
    catch(e) {
      log.fail(e)
      return
    }

    const newConfig = Object.assign({
      [env]: configTemplate
    }, oldConfig)
  
    fs.writeFileSync(rcPath, JSON.stringify(newConfig, null, 2))
  
    log.success('配置生成成功！')
  }
}