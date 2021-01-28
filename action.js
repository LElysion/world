const TOOL = require('./tool');
const SKILL = require('./skill');
const BUFF = require('./buff');

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


function handleAction(action, status) {
  if (status.win) return '战斗已结束，行动终止';
  let { curUnit, target } = action;
  let results = null;
  let logs = [`第${status.roundTime}回合：`];
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
    logs.push(`${curUnit.name}击败了${target.name}`, JSON.stringify(status.units));
    status.win = true;
  }
  return logs;
}

module.exports = {
  createAction, orderAction, handleAction
};
