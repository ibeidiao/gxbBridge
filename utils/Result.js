class Result {
  constructor() {
    
  }

  toValue(resCode, errorMsg, data) {
    this.resCode = resCode;
    this.errorMsg = errorMsg;
    this.data = data;
    return [
      {
        request_id: '',
        datasource: '',
        body: {
          code: resCode,
          message: errorMsg,
          data: data
        }
      }
    ]
  }
}

module.exports = Result;