const express = require('express')
const app = express()

app.use((req,res,next)=>{
  console.log(1)
  res.write('a')
  next()
  res.write('f')
  res.end()
  console.log(6)
})
app.use((req,res,next)=>{
  console.log(2)
  res.write('b')
  next()
  res.write('e')
  console.log(5)
})
app.use((req,res,next)=>{
  console.log(3)
  res.write('c')
  next()
  res.write('d')
  console.log(4)
})


app.listen(3000)