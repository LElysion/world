const TOOL = require('./tool');
const ACTION = require('./action');

let unit1 = {
  name: 'A',
  hp: 200,
  mp: 15,
  atk: 10,
  def: 5,
  spd: 10,
  type: function() {
    return ['ATTACK', 'DOUBLE_ATTACK', 'HEMOPHAGIA', 'FIGHTING_AND_BREVE', 'HEAVY_ATTACK'][TOOL.RandomNumBoth(4)]
  },
  id: 1,
  target: 2,
  action: true,
  buffs: []
};
let unit2 = {
  name: 'B',
  hp: 200,
  mp: 15,
  atk: 10,
  def: 5,
  spd: 11,
  type: function() {
    return ['ATTACK', 'DOUBLE_ATTACK', 'HEMOPHAGIA', 'FIGHTING_AND_BREVE', 'HEAVY_ATTACK'][TOOL.RandomNumBoth(4)]
  },
  id: 2,
  target: 1,
  action: true,
  buffs: []
};


let status = {
  win: false,
  roundTime: 1,
  units: {
    1: unit1,
    2: unit2
  }
}

while (!status.win) {
  console.log(round(status))
}

/**
 * 读取用户信息及指令并且返回新的用户信息
 */

function round(status) {

  if (status.win) return;

  let logs = [];

  let actions = ACTION.orderAction(TOOL.obj2arr(status.units)).map(item => {
    return ACTION.createAction(item, status.units[item.target], item.type);
  })

  actions.forEach(action => {
    logs.push(ACTION.handleAction(action, status));
  })

  status.roundTime++;

  return { logs }
}



