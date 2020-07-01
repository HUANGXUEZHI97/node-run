// 文件传入
const fs = require('fs')
const fileIn = fs.createReadStream('./amazed.jpg')
const fileOut = fs.createWriteStream('./amazed2.jpg')
fileIn.pipe(fileOut)