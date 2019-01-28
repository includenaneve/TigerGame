import React, { Component } from 'react'

import './Home.less'
import * as homebg from '@images/tigergame/home.png'
export default class Test extends Component {
  
  getCookie = idKey => { // 根据cookie名称获取值
    if(document.cookie.includes(idKey)) {
      let tigerId = document.cookie.split('; ').filter(item => item.includes('tigerGameId'))[0].split('=')[1]
      return decodeURIComponent(tigerId)
    }
    return ''
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="home">
        <img className="bg-img" src={homebg.default} alt=""/>
        {/* <h2 className="auth-info">欢迎你{decodeURIComponent(localStorage.getItem('tigerId')) || this.getCookie('tigerId')}</h2> */}
      </div>
    )
  }
}