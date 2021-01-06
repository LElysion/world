const BUFF = {
  VERTIGO: {
    name: '眩晕',
    effects: [
      { 
        prop: 'action', effectTarget: 'SELF', buffCode: 'VERTIGO',
        getEffectValue: function() { return false }, 
        getLog:  function(curUnit, target) { return `${curUnit.name}进入眩晕状态，无法行动` }
      }
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
      effectValue: typeof effect.getEffectValue === 'function' ? effect.getEffectValue(curUnit, target) : '',
      effectTarget: effect.effectTarget,
      effectProp: effect.prop,
      positive: effect.positive,
      buff: typeof effect.getBuff === 'function' ? effect.getBuff() : ''
    }
  })
}

module.exports = BUFF;