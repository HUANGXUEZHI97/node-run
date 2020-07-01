const { promisify } = require('util')//用于异步化
const figlet = promisify(require('figlet'))//打印漂亮的欢迎页面
const clear = require('clear')//清空命令行
const chalk = require('chalk')//把log日志变成其他颜色
const { clone } = require('./download')
const spawn = async (...args) => {//对接输出流
    const { spawn } = require('child_process')//引入子进程库
    return new Promise(resolve => {
        const proc = spawn(...args)//proc是子进程本身
        proc.stdout.pipe(process.stdout)//proc.stdout是子进程的输出流，此把子进程的输出流导入到主进程的输出流里
        proc.stderr.pipe(process.stderr)//proc.stdout是子进程的错误流，此把子进程的错误流导入到主进程的输出流里
        //无论正常还是错误都会导入到主进程里去
        proc.on('close', () => {//代表结束
            resolve()
        })
    })
}
const log = content => console.log(chalk.green(content)) // 封装打印欢迎页面方法
module.exports = async name => {
    // 打印欢迎画面
    clear()
    const data = await figlet('KKB Welcome')
    log(data)//打印
    // 创建项目
    log(`🚀创建项目:` + name)
    // 克隆代码
    await clone('github:su37josephxia/vue-template', name)
    //库规定的下载github的时候前面加上github: 后面在加上面地址
    //比如：https://github.com/facebook/react
    //则为github:facebook/react
    log('安装依赖')
    await spawn('cnpm', ['install'], { cwd: `./${name}` }) // 命令，参数，执行地址
    log(`
👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
            `)

    const open = require('open')
    open('http://localhost:8080')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}