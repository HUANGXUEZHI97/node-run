const fs = require('fs')

// sync读取文件
const data = fs.readFileSync('./download.js')
console.log(data.toString())

// async读取文件  注意：异步后面的回调函数err在前，data在后
fs.readFile('./download.js',(err,data)=>{
  if(err) throw err;
  console.log(data.toString())
})