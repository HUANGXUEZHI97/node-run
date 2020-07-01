const fs = require('fs')
const handlebars = require('handlebars')//模板库
const chalk = require('chalk')
module.exports = async () => {
    // 获取页面列表
    const list =
        fs.readdirSync('./src/views')//读取文件
            .filter(v => v !== 'Home.vue')
            .map(v => ({
                name: v.replace('.vue', '').toLowerCase(),//路由内组件名称
                file: v//路由内文件名称
            }))
    //生成路由定义
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')

    // 生成菜单
    compile({
        list
    }, './src/App.vue', './template/App.vue.hbs')



    /**
     * 编译模板文件
     * @param {*} meta 数据定义
     * @param {*} filePath 目标文件路径
     * @param {*} templatePath 模板文件路径
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {//如果模板没有就啥也不干
            const content = fs.readFileSync(templatePath).toString()
            const reslut = handlebars.compile(content)(meta)//柯里化
            fs.writeFileSync(filePath, reslut)
        }
        console.log(chalk.red(`🚀${filePath} 创建成功`))//成功就打印日志
    }


}