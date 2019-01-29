import React, { Component } from 'react'

import './Auth.less'
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

  checkLoginStatus = idKey => { // 检测localStorage和cookie有没有当前用户信息
    const storageId = localStorage.getItem(idKey)
    const cookieId = this.getCookie(idKey)
    const { history } = this.props
    if (storageId) {
      history.push('home')
      return
    }
    if (cookieId) {
      history.push('home')
      return
    }
    const id = prompt('输入你的ID以作登录')
    localStorage.setItem(idKey, encodeURIComponent(id))
    this.setCookie(idKey, id, 7)
    history.push('home')
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

  componentDidMount() {
    const res = this.limitWeixin()
    res && this.checkLoginStatus('tigerId')
  }

  render() {
    return (
      <div className="auth">
        验证身份中
      </div>
    )
  }
}