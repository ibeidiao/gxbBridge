const superagent = require('superagent');

const url = '101.132.174.77';
const port = '3000';
const get_data_timeout = 600;

const apiPath = {
  gxbcrime: '/rpc/1.17.2/1.0.0',        //公安不良记录
  gxbIdentityChk: '/rpc/1.17.4/1.0.0',  //身份验证
  gxbEduSearch: '/rpc/1.17.7/1.0.1',    //学历查询
};

const timeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const config = {
  url: `http://${url}:${port}`,
  apiPath: apiPath,
  async getReqId(apiPath, query) {    //初次请求requestId
    const url = `${this.url}${apiPath}`    
    const response = await new Promise((resolve, reject) => {
      superagent
      .get(url)
      .query(query)
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    });
    return response;
  },
  async getDate(requestId) {    //第二次请求数据，必须间隔500ms及以上
    const url = `${this.url}/api/request/${requestId}/data`
    const delay = await timeout(get_data_timeout);
    const dataRes = await new Promise((resolve, reject) => {
      superagent
      .get(url)
      .end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    });
    return dataRes;
  }
}

module.exports = config;