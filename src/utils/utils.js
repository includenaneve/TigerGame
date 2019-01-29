const myRandom = (min, max) => {
  return parseInt(max - (max - min) * Math.random())
}

const getNoRepeat3 = (len) => {
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
  const arrRes = res.filter(item => !(item[0] === item[1] && item[0] === item[2] && item[1] === item[2]))
  const max = arrRes.length
  const index = myRandom(0, max)
  return arrRes[index]
}

const getRepeat3 = (len) => {
  let arrBase =  new Array(len)
  for(let i = 0; i < len; i++) {
    arrBase[i] = i
  }
  return arrBase.map(item => [item, item, item])
}

const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
  })
}

export {
  getNoRepeat3,
  getRepeat3,
  myRandom,
  UUID
}