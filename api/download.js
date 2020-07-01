module.exports.clone = async function clone(repo, desc) {
  const { promisify } = require('util')
  const download = promisify(require('download-git-repo'))// download-git-repo是下载git上的repo，promisify是异步化
  const ora = require('ora')// ora用于显示进度条
  const process = ora(`正在下载....${repo}`)
  process.start()

  try {
    await download(repo, desc)
  } catch (error) {
    process.fail()
  }
  process.succeed()
}