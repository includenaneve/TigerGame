const getNoRepeat3 = (len = 13) => {
  let arrBase =  new Array(len)
  for(let i = 0; i < len; i++) {
    arrBase[i] = i
  }
  let res = []
  arrBase.forEach(item1 => {
    arrBase.forEach(item2 => {
      arrBase.forEach(item3 => {
        res.push([item1, item2, item3])
      })
    })
  })
  return res.filter(item => !(item[0] === item[1] && item[0] === item[2] && item[1] === item[2]))
}

const getRepeat3 = (len = 13) => {
  let arrBase =  new Array(len)
  for(let i = 0; i < len; i++) {
    arrBase[i] = i
  }
  return arrBase.map(item => [item, item, item])
}

export {
  getNoRepeat3,
  getRepeat3
}