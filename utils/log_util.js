const log4js = require('log4js');
const log_config = require('../config/log_config');

//加载配置文件
log4js.configure(log_config);

let logUtil = {};

let consoleLogger = log4js.getLogger('console');
let errorLogger = log4js.getLogger('error');
let resLogger = log4js.getLogger('response');

// 验证签名日志
logUtil.logSign = () => {
  
};

//封装错误日志
logUtil.logError = (ctx, error, resTime) => {
    if (ctx && error) {
      consoleLogger.error(formatError(ctx, error, resTime))
      errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装响应日志
logUtil.logResponse = (ctx, resTime) => {
    if (ctx) {
      consoleLogger.info(formatRes(ctx, resTime));
      resLogger.info(formatRes(ctx, resTime));
    }
};

//格式化响应日志
const formatRes = (ctx, resTime) => {
    let logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //响应状态码
    logText += "response status: " + ctx.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;

}

//格式化错误日志
const formatError = (ctx, err, resTime) => {
    let logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

//格式化请求日志
const formatReqLog = (req, resTime) => {

    let logText = new String();

    const method = req.method;
    //访问方法
    logText += "request method: " + method + "\n";

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";

    // 请求头部
    logText += "request header:  " + "\n" + JSON.stringify(req.headers) + "\n";    

    //开始时间
    let startTime;
    //请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\n";

    return logText;
}

module.exports = logUtil;