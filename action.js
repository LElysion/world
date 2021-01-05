function createAction(curUnit, target, actionType) {
  let type = typeof actionType === 'function' ? actionType() : actionType;
  return {
    curUnit, target, type
  }
}

module.exports = {
  createAction
};
