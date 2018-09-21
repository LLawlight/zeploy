const Client = require('ssh2').Client;
const path = require('path')
const fs = require('fs')
const log = require('./utils/log')
const msg = require('./utils/msg')
const ora = require('ora')

const conn = new Client()

module.exports = (env) => {
  const { ssh, distPath, targetPath } = require(`${path.resolve(`zeploy/${env}.js`)}`)
  const spinner = ora('连接远程服务器中...').start()

  conn.on('ready', function() {

    // 删除旧文件夹
    spinner.text = '正在清理旧文件夹...'
    conn.exec(`rm -rf ${targetPath}`, function(err, stream) {
      if (err) throw err

      const { fileList, dirList } = getAllPath(distPath)
      const targetDirPaths = dirList.map(dir => targetPath + dir.replace(distPath, '')).join(' ')
      console.log(targetDirPaths)

      // 创建文件夹
      spinner.text = '正在创建文件夹...'
      conn.exec(`mkdir -p ${targetDirPaths}`, function(err, stream) {
        if (err) throw err

        // 传输文件
        spinner.text = '正在传输文件...'
        conn.sftp(function(err, sftp) {
          if (err) throw err

          putfiles(sftp, fileList, distPath, targetPath).then(() => {
            spinner.succeed(`${msg.success('部署完成！')}`)
            conn.end()
          })
        })
      })
    })
  }).connect(ssh)
}

// 获取所有文件/文件夹的相对路径
function getAllPath(distPath) {
  const dirList = []
  const fileList = []

  function mapDir(dir) {
    const list = fs.readdirSync(dir)
    list.forEach(item => {
      const itemPath = dir + '/' + item
      if (fs.statSync(itemPath).isDirectory()) {
        dirList.push(itemPath)
        mapDir(itemPath)
      }
      else {
        fileList.push(itemPath)
      }
    })
  }

  mapDir(distPath)

  return {
    dirList,
    fileList
  }
}

/**
 * 
 * @param {*} sftp 
 * @param {*} fileAbsolutePath 待上传文件的绝对路径
 * @param {*} remoteFileAbsolutePath 上传到远程服务器的文件绝对路径
 */
function putfile(sftp, fileAbsolutePath, remoteFileAbsolutePath) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(path.resolve(fileAbsolutePath), remoteFileAbsolutePath, function(err) {
      if (err) {
        reject(err)
      }
  
      resolve()
    })
  })
}

/**
 * 
 * @param {*} sftp 
 * @param {*} fileList 待上传的文件列表[文件的相对路径]
 * @param {*} distPath 待上传的文件夹路径(相对路径)
 * @param {*} targetPath 远程服务器的文件夹路径(绝对路径)
 */
async function putfiles(sftp, fileList, distPath, targetPath) {
  for (let index = 0; index < fileList.length; index++) {
    const fileRelativePath = fileList[index]
    const fileAbsolutePath = path.resolve(fileRelativePath)
    const remoteFileAbsolutePath = targetPath + fileRelativePath.replace(distPath, '')

    await putfile(sftp, fileAbsolutePath, remoteFileAbsolutePath)
  }
}