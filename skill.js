// 最低伤害
function lowestDamage(result, atk) {
  return result > 0 ? result : Math.floor(atk * 0.1);
}

const SKILL = {
  'ATTACK': {
    name: '攻击',
    effects: [
      { prop: 'hp', baseValue: 0, continued: 0, positive: false, effectTarget: 'TARGET', 
        getEffectValue: function(curUnit, target) {
          return (lowestDamage(curUnit.atk - target.def, curUnit.atk));
        },
        getLog: function(curUnit, target) {
          return `${curUnit.name}攻击${target.name}，造成${this.getEffectValue(curUnit, target)}点伤害`;
        }
      }
    ],
    handler: function(curUnit, target) {
      return handleEffects(curUnit, target, this.effects)
    }
  },
  'DOUBLE_ATTACK': {
    name: '连击',
    effects: [
      { prop: 'hp', baseValue: 0, continued: 0, positive: false, effectTarget: 'TARGET', 
        getEffectValue: function(curUnit, target) {
          return (lowestDamage(curUnit.atk - target.def, curUnit.atk)) * 2;
        },
        getLog: function(curUnit, target) {
          return `${curUnit.name}连续攻击${target.name}，造成${this.getEffectValue(curUnit, target)}点伤害`;
        }
      }
    ],
    handler: function(curUnit, target) {
      return handleEffects(curUnit, target, this.effects)
    }
  },
  'HEMOPHAGIA': {
    name: '吸血',
    effects: [
      { prop: 'hp', baseValue: 0, continued: 0, positive: false, effectTarget: 'TARGET', 
        getEffectValue: function(curUnit, target) {
          return (lowestDamage(curUnit.atk - target.def, curUnit.atk));
        },
        getLog: function(curUnit, target) {
          return `${curUnit.name}使用吸血攻击${target.name}，造成${this.getEffectValue(curUnit, target)}点伤害`;
        }
      },
      { prop: 'hp', baseValue: 2, continued: 0, positive: true, effectTarget: 'SELF', 
        getEffectValue: function(curUnit, target) {
          return parseInt((lowestDamage(curUnit.atk - target.def, curUnit.atk)) * 0.5) + this.baseValue;
        },
        getLog: function(curUnit, target) {
          return `${curUnit.name}恢复了${this.getEffectValue(curUnit, target)}点生命值`;
        }
      },
    ],
    handler: function(curUnit, target) {
      return handleEffects(curUnit, target, this.effects)
    }
  },
  'FIGHTING_AND_BREVE': {
    name: '越战越勇',
    effects: [
      { prop: 'hp', baseValue: 0, continued: 0, positive: false, effectTarget: 'TARGET', 
        getEffectValue: function(curUnit, target) {
          return (lowestDamage(curUnit.atk - target.def, curUnit.atk));
        },
        getLog: function(curUnit, target) {
          return `${curUnit.name}使用越战越勇攻击${target.name}，造成${this.getEffectValue(curUnit, target)}点伤害`;
        }
      },
      { prop: 'atk', baseValue: 2, continued: 0, positive: true, effectTarget: 'SELF',
        getEffectValue: function(curUnit, target) {
          return this.baseValue;
        },
        getLog: function(curUnit, target) {
          return `${curUnit.name}越战越勇, 提升了${this.getEffectValue(curUnit, target)}点攻击力`;
        }
      },
      { prop: 'def', baseValue: 1, continued: 0, positive: true, effectTarget: 'SELF',
        getEffectValue: function(curUnit, target) {
          return this.baseValue;
        },
        getLog: function(curUnit, target) {
          return `${curUnit.name}越战越勇, 提升了${this.getEffectValue(curUnit, target)}点防御力`;
        }
      },
    ],
    handler: function(curUnit, target) {
      return handleEffects(curUnit, target, this.effects)
    }
  },
}

function handleEffects(curUnit, target, effects) {
  return effects.map(effect => {
    return {
      log: effect.getLog(curUnit, target),
      effectValue: effect.getEffectValue(curUnit, target),
      effectTarget: effect.effectTarget,
      effectProp: effect.prop,
      positive: effect.positive
    }
  })
}

module.exports = SKILL;

