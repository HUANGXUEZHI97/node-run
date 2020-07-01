const spawn = (...args) => {//一个流pipe的操作
  const { spawn } = require('child_process');//引入子进程库
  const proc = spawn(...args)//proc是子进程本身
  proc.stdout.pipe(process.stdout)//proc.stdout是子进程的输出流，此把子进程的输出流导入到主进程的输出流里
  proc.stderr.pipe(process.stderr)//proc.stdout是子进程的错误流，此把子进程的错误流导入到主进程的输出流里
  //无论正常还是错误都会导入到主进程里去
  return proc
}

module.exports = async () => {
  const watch = require('watch')
  let process
  let isRefresh = false
  watch.watchTree('./src', async (f) => {
      if (!isRefresh) {
          isRefresh = true
          process && process.kill()
          await require('./refresh')()
          setTimeout(() => { isRefresh = false }, 5000)
          process = spawn('npm', ['run', 'serve'])
      }
  })
}