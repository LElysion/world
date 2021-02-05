function obj2arr(obj) {
  let result = [];
  for(let key in obj) {
    result.push(obj[key]);
  }
  return result;
}

function RandomNumBoth(max, min = 0) {
  return Math.round(Math.random() * (max - min)) + min;
}









module.exports = {
  obj2arr, RandomNumBoth
};
