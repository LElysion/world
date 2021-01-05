const SKILL = require('./skill');
const TOOL = require('./tool');
const ACTION_HANDLER = require('./action')

let unit1 = {
  name: 'A',
  hp: 200,
  mp: 15,
  atk: 10,
  def: 5,
  spd: 10,
  type: function() {
    return ['ATTACK', 'DOUBLE_ATTACK', 'HEMOPHAGIA', 'FIGHTING_AND_BREVE'][TOOL.RandomNumBoth(3)]
  },
  id: 1,
  target: 2
};
let unit2 = {
  name: 'B',
  hp: 200,
  mp: 15,
  atk: 10,
  def: 5,
  spd: 10,
  type: function() {
    return ['ATTACK', 'DOUBLE_ATTACK', 'HEMOPHAGIA', 'FIGHTING_AND_BREVE'][TOOL.RandomNumBoth(3)]
  },
  id: 2,
  target: 1
};

let win = false;
let roundTime = 1;

let units = {
  1: unit1,
  2: unit2
}

while (!win) {
  console.log(round())
}

/**
 * 读取用户信息及指令并且返回新的用户信息
 */

function round() {

  if (win) return;

  let logs = [];

  let actions = TOOL.obj2arr(units).map(item => {
    return ACTION_HANDLER.createAction(item, units[item.target], item.type);
  })

  const handleAction = (action) => {
    if (win) return '战斗已结束，行动终止';
    let { curUnit, target } = action;
    let results = null;
    let logs = [`第${roundTime}回合：`];
    let unitsAlias = {
      'SELF': curUnit,
      'TARGET':  target
    }

    results = SKILL[action.type].handler(curUnit, target);
    results.forEach((result) => {
      unitsAlias[result.effectTarget][result.effectProp] += (result.effectValue * (result.positive ? 1 : -1));
      logs.push(result.log);
    })
    
    if (target.hp <= 0) {
      logs.push(`${curUnit.name}击败了${target.name}`, JSON.stringify(unit1), JSON.stringify(unit2));
      win = true;
    }
    return logs;
  }

  actions.forEach(action => {
    logs.push(handleAction(action));
  })

  roundTime++;

  return { logs }
}



