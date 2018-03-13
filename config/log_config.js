const path = require('path');

const logsRoot = path.resolve(__dirname, '../logs');

const errorPath = '/error';
const errorFileName = 'error';
const errorLogPath = path.join(logsRoot, errorPath, errorFileName);

const resPath = '/response';
const resFileName = 'response';
const resLogPath = path.join(logsRoot, resPath, resFileName);

const config = {
  "appenders": 
  {
    //控制台输出
    out: {
      type: "console"
    },
    //错误日志
    errorLogger: {
      "type": "dateFile",           //日志类型       
      "filename": errorLogPath,     //日志输出位置
      "alwaysIncludePattern":true,  //是否总是有后缀名
      "pattern": "-yyyy-MM-dd.log",  //后缀，每天创建一个新的日志文件
      // "path": errorPath
    },
    //响应日志
    resLogger: {
      "type": "dateFile",
      "filename": resLogPath,
      "alwaysIncludePattern":true,
      "pattern": "-yyyy-MM-dd.log",
      // "path": resPath
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'ALL'
    },
    error: {
      appenders: ['errorLogger'],
      level: 'ERROR'
    },
    response: {
      appenders: ['resLogger'],
      level: 'ALL'
    }
  }
}

module.exports = config;