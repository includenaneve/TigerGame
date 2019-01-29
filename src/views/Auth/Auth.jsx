import React, { Component } from 'react'

import './Auth.less'
import * as welcome from '@images/tigergame/welcome.png'
import * as submitBtn from '@images/tigergame/submit.png'
import { UUID } from '@utils/utils'
import { API } from '@api/API'
export default class Auth extends Component {

  setCookie = (idKey, value, lifeDay) => { // cookie名称, 传入的值, 过期时间（x天后）
    const deadDay = new Date(new Date().setDate(new Date().getDate() + lifeDay))
    document.cookie = idKey + "=" + encodeURIComponent(value) + ((lifeDay == null) ? "" : ";expires=" + deadDay.toGMTString())
  }

  getCookie = idKey => { // 根据cookie名称获取值
    if(document.cookie.includes(idKey)) {
      let tigerId = document.cookie.split('; ').filter(item => item.includes(idKey))[0].split('=')[1]
      return decodeURIComponent(tigerId)
    }
    return ''
  }

  checkUUID = idKey => { // 检测localStorage和cookie有没有当前用户信息
    const storageId = localStorage.getItem(idKey)
    const cookieId = this.getCookie(idKey)
    if (storageId) {
      return decodeURIComponent(storageId)
    }
    if (cookieId) {
      return storageId
    }
    const id = UUID()
    localStorage.setItem(idKey, encodeURIComponent(id))
    this.setCookie(idKey, id, 7)
    return id
  }

  limitWeixin = () => {
    let useragent = navigator.userAgent
     if (useragent.includes('MicroMessenger')) {
       return true
     } else {
      this.props.history.replace('weixin')
      return false
     }
  }

  checkGame = async() => {
    const uuid = this.checkUUID('uuid')
    try {
      const res = await API.login(uuid)
      if (parseInt(res.remain) > 0) { // 如果剩余次数大于等于1次
        this.props.history.push('home')
      } else {
        alert('机会已经用完，不能再玩了~')
      }
    } catch (e) {
      alert(e)
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="auth">
        <img className="auth-bg" src={welcome.default} alt=""/>
        <img className="auth-submit" src={submitBtn} alt="" onClick={this.checkGame}/>
      </div>
    )
  }
}