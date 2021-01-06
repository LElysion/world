const TOOL = require('./tool');

function createAction(curUnit, target, actionType) {
  let type = typeof actionType === 'function' ? actionType() : actionType;
  return {
    curUnit, target, type
  }
}

function orderAction(units) {
  let pro = 50;
  let compare = function(a, b) {
    let randomPro = TOOL.RandomNumBoth(100);
    if(a.spd < b.spd) return 1;
    if(a.spd > b.spd) return -1;
    if(pro < randomPro) return 1;
    return -1;
  }
  return units.sort(compare);
}

module.exports = {
  createAction, orderAction
};
