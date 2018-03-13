const router = require('koa-router')()
const superagent = require('superagent');

const Result = require('./../utils/Result');
const gxb_api_config = require('./../config/gxb_api_config');

const result = new Result();

router.prefix('/api');

// 公安不良记录
router.get('/gxbcrime', async (ctx, next) => {
  const query = ctx.query;
  if (!query || !query.name || !query.idcard) {
    ctx.body = result.toValue(1004, '请求参数不完整', '');
    return;
  }

  //初次请求requestId
  const res = await gxb_api_config.getReqId(gxb_api_config.apiPath.gxbcrime, query);

  if (res && res.body && res.body.data && res.body.data.request_id) {
    //第二次请求数据
    const dataRes = await gxb_api_config.getDate(res.body.data.request_id);

    if (dataRes && dataRes.status === 200 && dataRes.body) {
      ctx.body = dataRes.body;
      return;
    }
  }

  ctx.body = result.toValue(10011, '请求超时', '');
});

// 身份验证
router.get('/gxbIdentityChk', async (ctx, next) => {
  const query = ctx.query;
  if (!query || !query.name || !query.idcard) {
    ctx.body = result.toValue(1004, '请求参数不完整', '');
    return;
  }

  //初次请求requestId
  const res = await gxb_api_config.getReqId(gxb_api_config.apiPath.gxbIdentityChk, query);

  if (res && res.body && res.body.data && res.body.data.request_id) {
    //第二次请求数据
    const dataRes = await gxb_api_config.getDate(res.body.data.request_id);
    
    if (dataRes && dataRes.status === 200 && dataRes.body) {
      ctx.body = dataRes.body;
      return;
    }
  }

  ctx.body = result.toValue(10011, '请求超时', '');
});

// 学历查询
router.get('/gxbEduSearch', async (ctx, next) => {
  const query = ctx.query;
  if (!query || !query.name || !query.idcard) {
    ctx.body = result.toValue(1004, '请求参数不完整', '');
    return;
  }

  //初次请求requestId
  const res = await gxb_api_config.getReqId(gxb_api_config.apiPath.gxbEduSearch, query);

  if (res && res.body && res.body.data && res.body.data.request_id) {
    //第二次请求数据
    const dataRes = await gxb_api_config.getDate(res.body.data.request_id);
    
    if (dataRes && dataRes.status === 200 && dataRes.body) {
      ctx.body = dataRes.body;
      return;
    }
  }

  ctx.body = result.toValue(10011, '请求超时', '');
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'api string'
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'api json'
  }
});

module.exports = router;
