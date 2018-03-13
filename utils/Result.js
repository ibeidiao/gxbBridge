class Result {
  constructor() {
    
  }

  toValue(resCode, errorMsg, data) {
    this.resCode = resCode;
    this.errorMsg = errorMsg;
    this.data = data;
    return {
      resCode: resCode,
      errorMsg: errorMsg,
      data: data
    }
  }
}

module.exports = Result;