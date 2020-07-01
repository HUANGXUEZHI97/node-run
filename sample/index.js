const Koa = require('koa')
const app = new Koa();
const path = require('path')

// koa2中间件：静态服务static、路由router
// 静态服务static，如：服务器直接访问http://localhost:3001/static/amazed.jpg和查看图片
// 路由router 对服务器请求地址的封装
const koaStatic = require('koa-static')(__dirname, '/')
const koaRouter = require('koa-router')()

// app.use((ctx, next) => {
//   ctx.body = [
//     {
//       name: 'tom'
//     }
//   ]
//   next()
// })

// app.use((ctx, next) => {
//   ctx.body && ctx.body.push({ name: 'jerry' })
//   console.log('url:', ctx.url)
//   // if (ctx.url === '/html') {
//   //   ctx.type = 'text/html;charset=utf-8'
//   //   ctx.body = `<b>我的名字是：${ctx.body[0].name}</b>`
//   // }
//   next()
// })

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  console.log(`${start}ms`);
  await next();
  const end = new Date().getTime();
  console.log(`请求${ctx.url}，耗时${parseInt(end - start)}ms`)
})

// 路由
koaRouter.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 String'
})
koaRouter.get('/json', async (ctx, next) => {
  ctx.body = { title: 'koa2 json' }
})

app.use(koaStatic)
app.use(koaRouter.routes())

app.listen(3001)