const util = {
  sortByKey(obj) {
    let keyArray = [];
    let resultArray = [];
    for(key in obj) {
      keyArray.push(key);
    }
    keyArray.sort();
    keyArray.forEach((key, index) => {
      resultArray.push(`${key}${obj[key]}`);
    });
    return resultArray;
  }
}

module.exports = util;