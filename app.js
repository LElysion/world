const SKILL = require('./skill');
const TOOL = require('./tool');
const ACTION = require('./action');
const BUFF = require('./buff')

let unit1 = {
  name: 'A',
  hp: 200,
  mp: 15,
  atk: 10,
  def: 5,
  spd: 10,
  type: function() {
    return ['ATTACK', 'DOUBLE_ATTACK', 'HEMOPHAGIA', 'FIGHTING_AND_BREVE', 'HEAVY_ATTACK'][TOOL.RandomNumBoth(3)]
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
  spd: 10,
  type: function() {
    return ['ATTACK', 'DOUBLE_ATTACK', 'HEMOPHAGIA', 'FIGHTING_AND_BREVE', 'HEAVY_ATTACK'][TOOL.RandomNumBoth(3)]
  },
  id: 2,
  target: 1,
  action: true,
  buffs: []
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

  let actions = ACTION.orderAction(TOOL.obj2arr(units)).map(item => {
    return ACTION.createAction(item, units[item.target], item.type);
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

    curUnit.action =  true;

    // 状态处理
    curUnit.buffs.forEach(buff => {
      let results = BUFF[buff.code].handler(curUnit, target);
      results.forEach(result => {
        typeof result.effectValue === 'boolean' 
          ? unitsAlias[result.effectTarget][result.effectProp] = result.effectValue
          : unitsAlias[result.effectTarget][result.effectProp] += (result.effectValue * (result.positive ? 1 : -1));
      })
    })

    if(!!curUnit.action) {
      // 操作指令
      results = SKILL[action.type].handler(curUnit, target);
      results.forEach((result) => {
        let { effectProp } = result;
        if(effectProp === 'buffs') {
          let pro = TOOL.RandomNumBoth(100);
          if(pro <= result.probability) {
            unitsAlias[result.effectTarget][result.effectProp].push(result.buff);
            logs.push(result.log)
          }
        } else {
          unitsAlias[result.effectTarget][result.effectProp] += (result.effectValue * (result.positive ? 1 : -1));
          logs.push(result.log);
        }
      })
    } else {
      logs.push(`${curUnit.name}无法行动`)
    }

    let buffcount = curUnit.buffs.length;
    while(buffcount--) {
      curUnit.buffs[buffcount].continued--;
      if(curUnit.buffs[buffcount].continued <= 0) {
        curUnit.buffs.splice(buffcount, 1);
      }
    }

    
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



