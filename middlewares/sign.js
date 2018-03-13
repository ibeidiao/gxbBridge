const Result =  require('../utils/Result');
const util = require('../utils/util');
const _ = require('lodash');
const crypto = require('crypto');

const result = new Result();

const salt = 'gongxinbao@ibeidiao';

const sign = (ctx) => {
  const headers = ctx.headers;
  const account = headers['x-account'];
  const timestamp = headers['x-timestamp'];
  const sign = headers['x-sign'];
  
  if (account === undefined || timestamp === undefined || sign === undefined) {
    ctx.body = result.toValue(1004, '请求参数不完整', '');
    return;
  }

  let query = null;

  if (ctx.method === 'GET') {
    query = ctx.query;
  } else if(ctx.method === 'POST') {
    query = ctx.body;
  }

  _.extend(query, {
    account: account
  });
  let sortRsult = util.sortByKey(query);
  sortRsult.push(timestamp);
  sortRsult.push(salt);
  const signString = sortRsult.join('');
  console.log(`signString: ${signString}`);
  
  const md5 = crypto.createHash('md5');
  md5.update(signString);
  console.log(`md5: ${md5.digest('hex')}`)

}

const url_filter = (pattern) => {
  return async function(ctx, next){
    var reg = new RegExp(pattern);
    //先去执行路由
    await next();
    //通过正则的url进行格式化处理
    if(reg.test(ctx.originalUrl)){
      sign(ctx);
    }
  }
}

module.exports = url_filter;