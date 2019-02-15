import React, { Component } from 'react'

import './Auth.less'
import * as pics from '@images/tigergame/export'
import * as clouds from '@images/tigergame/cloud/export'
import { UUID } from '@utils/utils'
import { API } from '@api/API'
import { delayAsync } from '@utils/utils'
import * as audio from '@audio/onetwo.mp3'
import * as playState from '@images/tigergame/export2'
import * as sharePic from '@images/tigergame/shareIcon.jpg'
import { when, observable, action } from 'mobx'
import { observer } from 'mobx-react';
import finger from '@images/tigergame/finger.png'
@observer
class Auth extends Component {

  @observable audioState = 'running'
  @observable mask = true

  @action setMask = () => {
    this.mask = false
  }

  @action setAudioState = () => {
    if (this.audioState === 'running') {
      this.audioState = 'pause'
      this.refs.audio.pause()
    } else {
      this.audioState = 'running'
      this.refs.audio.play()
    }
  }

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
      return this.getCookie()
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

  checkGame = async(e) => {
    // e.target.style.animationPlayState = "running"
    // const delayRes = await delayAsync(100)
    // if (delayRes) {
    //   this.refs.btn.style = ""
    // }
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

  maskDisapear = async() => {
    this.setMask()
    try {
      await this.refs.audio.play()
    } catch (e) {
      console.log(e)
    }
  }

  removeLoginStatus = () => {
    localStorage.removeItem('uuid')
    this.setCookie('uuid', '', -1)
  }

  normal = () => {
    API.won()
  }

  bigprice = () => {
    API.big()
  }

  audioLoaded = async() => {
    const pics = document.getElementsByName('audio')
    const funs = Object.keys(pics).map(index => {
      return new Promise((resolve, reject) => {
        if (pics[index].complete || pics[index].readyState === 4) {
          resolve(0)
        } else {
          reject()
        }
      })
    })
    const promiseAllRes = await Promise.all(funs)
    return new Promise((resolve, reject) => {
      if (promiseAllRes) {
        resolve()
      } else {
        reject('audio not ready')
      }
    })
  }

  componentDidMount = async() => {
    await this.audioLoaded()
    const autoPlay = async() => {
      try {
        await this.refs.audio.play()
      } catch (e) {
        console.log(e)
      }
      document.removeEventListener('click', autoPlay)
      document.removeEventListener('touchstart', autoPlay)
    }
    document.addEventListener('click', autoPlay)
    document.addEventListener('touchstart', autoPlay)
  }

  render() {
    return (
      <div className="auth" id="auth">
        {
          this.audioState === 'running'
          ? <img className="audioStatus" src={playState.play} onClick={this.setAudioState} alt=""/>
          : <img className="audioStatus" src={playState.pause} onClick={this.setAudioState} alt=""/>
        }
        <audio ref="audio" src={audio.default} autoPlay loop></audio>
        <div className="frame-top">
          <img className="top-pic" src={pics.top} alt=""/>
        </div>  
        <div className="frame-middle"></div>
        <div className="frame-btm">
          <img className="btm-pic" src={pics.btm} alt=""/>
        </div>
        <img className="auth-cloud1" src={clouds.cloud1} alt=""/>
        <img className="auth-cloud2" src={clouds.cloud2} alt=""/>
        <img className="revenger" alt='' src={pics.avengers} />
        <img className="title" alt='' src={pics.title} />
        <img className="submit-final" ref="btn" alt='' src={pics.submit} onClick={this.checkGame}/>
        {
          this.mask && <div className="mask" onClick={this.maskDisapear}>
            <img className="finger" src={finger} alt=""/>
          </div>
        }
        
        <div className="test-wrapper">
          <div className="btn" onClick={this.removeLoginStatus}>清除登录状态</div>
          <div className="btn" onClick={this.normal}>普通奖</div>
          <div className="btn" onClick={this.bigprice}>大奖</div>
        </div>
      </div>
    )
  }
}

export default Auth