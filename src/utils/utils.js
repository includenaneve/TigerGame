import { labels } from '@constants/constants'
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

const getRepeat3 = cardid => {/*  */
  return [cardid - 1, cardid - 1, cardid - 1]
}

const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
  })
}
const getCookie = idKey => { // 根据cookie名称获取值
  if(document.cookie.includes(idKey)) {
    let tigerId = document.cookie.split('; ').filter(item => item.includes(idKey))[0].split('=')[1]
    return decodeURIComponent(tigerId)
  }
  return ''
}

const getUUID = (idKey = 'uuid') => { // 根据cookie名称获取值
  const storageId = localStorage.getItem(idKey)
  const cookieId = getCookie(idKey)
  if (storageId) {
    return decodeURIComponent(storageId)
  }
  if (cookieId) {
    return storageId
  }
  return false
}

const findPic = key => {
  const type = key.substring(0, key.length - 1)
  const arr = labels[type]
  return arr.filter(item => item.key === key)[0].icon
}

export {
  getNoRepeat3,
  getRepeat3,
  myRandom,
  UUID,
  getUUID,
  getCookie,
  findPic
}