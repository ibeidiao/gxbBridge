const router = require('koa-router')()

router.prefix('/api')

router.get('/string', async (ctx, next) => {
  ctx.body = 'api string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'api json'
  }
})

module.exports = router