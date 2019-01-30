import axios from "axios"

// const apiUrl = 'http://sh.itsnot.club:3000/'
const apiUrl = ' https://www.easy-mock.com/mock/5c5090971d995534795d155f/'

let API = {}

API.gm = async(url) => {
  const { status, data } = await axios({
    method: 'GET',
    url: apiUrl + url,
  })
  return new Promise((resolve, reject) => {
    if (status === 200) {
      resolve(data)
    } else {
      reject(new Error('请求失败! 状态码:' + status))
    }
  })
}

API.pm = async(url, obj) => {
  let params = new URLSearchParams();
  for(let key in obj) {
    params.append(key, obj[key]);
  }
  const { status, data } = await axios.post(apiUrl + url, params);
  return new Promise((resolve, reject) => {
    if (status === 200) {
      resolve(data)
    } else {
      reject(new Error('请求失败! 状态码:' + status))
    }
  })
}

API.login = uuid => {
  return API.gm('login?openid=' + uuid)
}

API.roll = uuid => {
  return API.gm('roll?openid=' + uuid)
}

export {
  API
}

