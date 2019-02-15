import React, { Component } from 'react'
import { observer } from 'mobx-react'

import './Home.less'
import * as pics from '@images/tigergame/home/export2'
import * as dialogs from '@images/tigergame/home/export3'
import * as playState from '@images/tigergame/export2'
import { types, labels } from '@constants/constants'
import HomeData from './HomeData'
import { observable, when, action } from 'mobx'
import Staff from './staff/staff'

import Cloud from '@views/Cloud/Cloud'
import ResultCard from '@components/ResultCard/ResultCard'
import { getNoRepeat3, getRepeat3, getUUID, findPic, delayAsync } from '@utils/utils'
import { API } from '@api/API'

import * as audio from '@audio/onetwo.mp3'
import * as roll from '@audio/roll.mp3'
@observer
class Home extends Component {
  @observable data = new HomeData()
  @observable audioState = 'running'

  @action setAudioState = () => {
    if (this.audioState === 'running') {
      this.audioState = 'pause'
      this.refs.audio.pause()
      this.refs.roll.pause()
    } else {
      this.audioState = 'running'
      this.refs.audio.play()
    }
  }

  updataStore = async(uuid) => { // 暂存用户游玩信息
    try {
      const res = await API.login(uuid)
      this.data.setDataByKey('remain', parseInt(res.remain)) // 可玩次数
      this.data.setDataByKey('used', parseInt(res.used)) // 已玩次数
      this.data.setDataByKey('won', parseInt(res.won)) // 赢取大奖次数
    } catch (e) {
      alert(e)
    }
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
    const uuid = getUUID() // 进来获取用户的uuid
    if (uuid === false) { // 获取不到，提示用户并跳到获取auth页面获取uuid
      alert('在首页开始才能得到大神的眷顾哦~')
      this.props.history.push('auth')
    } else {
      this.updataStore(uuid) //获取到的话，拿这个uuid获取用户的游玩信息
    }
  }

  cloudDisplay = resArr => {
    this.data.cloudAppear()
    const timerId = setTimeout(this.data.cloudDisappear, 6000)
    when(
      () => this.data.store.cloudShow === 0,
      () => {
        clearTimeout(timerId);
        this.data.setDataByKey('resArr', resArr)
        this.data.setDataByKey('godArr', resArr)
      }
    )
  }

  showResult = () => {
    when(
      () => this.data.cardClosedAll,
      () => {
        this.props.history.push('result/' + encodeURIComponent(this.data.store.godArr))
      }
    )
  }

  audioSwitch = () => {
    this.refs.roll.play()
    this.refs.audio.pause()
  }

  handleSubmit = async(e) => {
    // e.target.style.animationPlayState = "running"
    // const delayRes = await delayAsync(100)
    // if (delayRes) {
    //   this.refs.submit.style = ""
    // }
    if (this.data.canSubmit) {
      this.audioSwitch()
      const uuid = getUUID('uuid') // 进来获取用户的uuid
      if (!uuid) { // 获取不到，提示用户并跳到获取auth页面获取uuid
        alert('在首页开始才能得到大神的眷顾哦~')
        this.props.history.push('auth')
      } else {
        let res
        try {
          res = await API.roll(uuid) // 获取召唤信息
        } catch (e) {
          alert(e)
        }
        if (res.err && parseInt(res.err) === -1) { // err为-1提示用户没登录
          alert('在首页开始才能得到大神的眷顾哦~')
          this.props.history.push('auth')
        } else if (res.err && parseInt(res.err) === -2) { // err为-2游玩已达上限
          alert('您的游玩次数已达上限~')
          // 提示用户分享增加游玩次数？跳到分享页？
        } else { // 一般情况有奖池编号和序号
          const { pool, sequence } = res
          let resArr // 大神卡片编号 [x, x, x]
          if (parseInt(pool) === -1 || this.data.store.won > 0 || parseInt(pool) > 11) { // 如果没中奖，或者已经赢过大奖。生成三张不中奖的卡片
            resArr = getNoRepeat3(10)
          } else if (parseInt(pool) >= 1 && parseInt(pool) < 11) { // 如果结果返回1-10之间的大神卡。生产三张一样的卡片
            resArr = getRepeat3(parseInt(pool))
          }
          if (parseInt(pool) === 11) {
            resArr = getRepeat3(10)
          }
          this.cloudDisplay(resArr) // 祥云动画播放切动画结束时弹出卡片。
          this.showResult()
        }
      }
    }
  }

  render() {
    const { currentType, choosenLabels, cloudShow, resArr} = this.data.store
    const { setDataByKey, updateChoosenLabels, hideLabel, cardShow, removeCard} = this.data
    return (
      <div className="home">
        {
          this.audioState === 'running'
          ? <img className="audioStatus" src={playState.play} onClick={this.setAudioState} alt=""/>
          : <img className="audioStatus" src={playState.pause} onClick={this.setAudioState} alt=""/>
        }
        <audio src={audio.default} autoPlay loop ref="audio" ></audio>
        <audio src={roll.default} loop ref="roll" ></audio>
        {/* 布局 */}
        <div className="frame-top">
          <img className="top-pic" src={pics.top} alt=""/>
        </div>  
        <div className="frame-middle"></div>
        <div className="frame-btm">
          <img className="btm-pic" src={pics.buttom} alt=""/>
        </div>
        <img className="title" src={pics.title} alt=""/>
        <img className="room" src={pics.room} alt=""/>
        {/* cloudShow标志层1时渲染祥云动画 */}
        { cloudShow === 1 ? <Cloud /> : null }
        {/* 当结果数组长度大于3 并且 当祥云动画没有播放时显示大神卡片 */}
        { cardShow ? <ResultCard arr={resArr} removeCard={removeCard}/> : null }
        {/* 选中摆件位置 */}
        { choosenLabels.air && choosenLabels.air !== 'air5' && <img className="fixed-air" src={findPic(choosenLabels.air)} alt=""/> }
        { choosenLabels.air && choosenLabels.air === 'air5' && <img className="fixed-air5" src={findPic(choosenLabels.air)} alt=""/> }
        { choosenLabels.pet && <img className="fixed-pet" src={findPic(choosenLabels.pet)} alt=""/> }
        { choosenLabels.staff && <Staff url={findPic(choosenLabels.staff)}/> }
        { choosenLabels.plant && choosenLabels.plant === 'plant1' && <div className="fixed-plant1"><img className="plant1" src={findPic(choosenLabels.plant)} alt=""/><img className="dialog1" src={dialogs.d1} alt=""/></div> }
        { choosenLabels.plant && choosenLabels.plant === 'plant2' && <div><img className="fixed-plant2" src={findPic(choosenLabels.plant)} alt=""/></div> }
        { choosenLabels.plant && choosenLabels.plant === 'plant3' && <div className="fixed-plant3"><img className="plant3" src={findPic(choosenLabels.plant)} alt=""/><img className="dialog3" src={dialogs.d3} alt=""/></div> }
        { choosenLabels.plant && choosenLabels.plant === 'plant4' && <div className="fixed-plant4"><img className="plant4" src={findPic(choosenLabels.plant)} alt=""/><img className="dialog4" src={dialogs.d4} alt=""/></div> }
        { choosenLabels.plant && choosenLabels.plant === 'plant5' && <div className="fixed-plant5"><img className="plant5" src={findPic(choosenLabels.plant)} alt=""/><img className="dialog5" src={dialogs.d5} alt=""/></div> }
        {/* 交互界面 */}
        <div className="main-wrapper">
          <div className="type-wrapper">
            { types.map(item => {
                return (
                  <div key={item.key} className={item.key === currentType ? 'type-box type-box-checked' : 'type-box'} onClick={() => setDataByKey('currentType', item.key)}>
                    <img className="type-icon" src={item.icon} alt=""/>
                    <div className="type-dec">{item.name}</div>
                  </div>
                )
              })
            }
          </div>
          <div className="label-wrapper">
            { labels[currentType] && labels[currentType].map(item => {
                return (
                  <div key={item.key} className='label-box' onClick={() => updateChoosenLabels(item.key)}>
                    { hideLabel !== item.key ? <img className="label-icon" src={item.icon} alt=""/> : null }
                    { hideLabel !== item.key ? <div className="label-dec">{item.name}</div> : <div className="checkText">选中</div> }
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* 召唤按钮 */}
        <img ref="submit" className="submit-final" src={pics.submit} alt="" onClick={this.handleSubmit}/>
      </div>
    )
  }
}

export default Home