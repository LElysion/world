
let unit1 =  {
  activeProp: {
    hp: 200,
    mp: 20,
    atk: 10,
    def: 5,
    spd: 10,
    ative: true,
    buffs: []
  }
}

function Unit(
  activeProp,
  exhibitionProp
) {
  // 可操作属性
  this.activeProp = activeProp
  // 展示属性
  this.exhibitionProp = exhibitionProp;
}




