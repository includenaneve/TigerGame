import React, { Component } from 'react'

import './Home.less'
export default class Test extends Component {

  setCookie(c_name, value, expiredays) {
    const deadDay = new Date(new Date().setDate(new Date().getDate() + 7))
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + deadDay.toGMTString());
  };

  getCookie(c_name) {
    if(document.cookie.includes('tigerGameId')) {
      let tigerId = document.cookie.split('; ').filter(item => item.includes('tigerGameId'))[0].split('=')[1]
      return tigerId
    }
    return "";
  }

  componentDidMount() {
    if (this.getCookie() !== '') {
      alert('欢迎' + this.getCookie())
    } else {
      const id = prompt('检测到你未登陆，请登录（英文）')
      this.setCookie("tigerGameId", id, 30)
    }
  }

  render() {
    return (
      <div className="home">HOME</div>
    )
  }
}