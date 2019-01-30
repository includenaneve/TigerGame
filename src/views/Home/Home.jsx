import React, { Component } from 'react'
import { observer } from 'mobx-react'

import './Home.less'
import * as homebg from '@images/tigergame/home.png'
import * as submitBtn from '@images/tigergame/submit.png'
import { types, labels } from '@constants/constants'
import HomeData from './HomeData'
import { observable, when } from 'mobx'
import Staff from './staff/staff'

import Cloud from '@views/Cloud/Cloud'
import ResultCard from '@components/ResultCard/ResultCard'
import { getNoRepeat3, getRepeat3, getUUID, findPic } from '@utils/utils'
import { API } from '@api/API'
@observer
class Home extends Component {
  @observable data = new HomeData()

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

  componentDidMount() {
    const uuid = getUUID() // 进来获取用户的uuid
    if (uuid === false) { // 获取不到，提示用户并跳到获取auth页面获取uuid
      alert('在首页开始才能得到大神的眷顾哦~')
      this.props.history.push('auth')
    } else {
      this.updataStore(uuid) //获取到的话，拿这个uuid获取用户的游玩信息
    }
    when(
     () => this.data.canSubmit,
     () => this.refs.submit.style.animationPlayState = "running"
    )
  }

  cloudDisplay = resArr => {
    this.data.cloudAppear()
    const timerId = setTimeout(this.data.cloudDisappear, 6000)
    when(
      () => this.data.store.cloudShow === 0,
      () => { clearTimeout(timerId); this.data.setDataByKey('resArr', resArr)}
    )
  }

  handleSubmit = async() => {
    const uuid = getUUID() // 进来获取用户的uuid
    if (uuid === false) { // 获取不到，提示用户并跳到获取auth页面获取uuid
      alert('在首页开始才能得到大神的眷顾哦~')
      this.props.history.push('auth')
    } else {
      let res
      try {
        res = await API.roll() // 获取召唤信息
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
          resArr = getNoRepeat3(11)
        } else if (parseInt(pool) >= 1 && parseInt(pool) <= 11) { // 如果结果返回1-11之间的大神卡。生产三张一样的卡片
          resArr = getRepeat3(parseInt(pool))
        }
        this.cloudDisplay(resArr) // 祥云动画播放切动画结束时弹出卡片。
      }
    }
  }

  render() {
    const { currentType, choosenLabels, cloudShow, resArr} = this.data.store
    const { setDataByKey, updateChoosenLabels, hideLabel, canSubmit, cardShow, removeCard} = this.data
    return (
      <div className="home">
        {/* cloudShow标志层1时渲染祥云动画 */}
        { cloudShow === 1 ? <Cloud /> : null }
        {/* 当结果数组长度大于3 并且 当祥云动画没有播放时显示大神卡片 */}
        { cardShow && cloudShow === 0 ? <ResultCard arr={resArr} removeCard={removeCard}/> : null }
        {/* 背景图 */}
        <img className="bg-img" src={homebg.default} alt=""/>
        {/* 选中摆件位置 */}
        { choosenLabels.air && choosenLabels.air !== 'air5' && <img className="fixed-air" src={findPic(choosenLabels.air)} alt=""/> }
        { choosenLabels.air && choosenLabels.air === 'air5' && <img className="fixed-air5" src={findPic(choosenLabels.air)} alt=""/> }
        { choosenLabels.pet && <img className="fixed-pet" src={findPic(choosenLabels.pet)} alt=""/> }
        { choosenLabels.staff && <Staff url={findPic(choosenLabels.staff)}/> }
        { choosenLabels.plant && choosenLabels.plant !== 'plant5' && <img className="fixed-plant" src={findPic(choosenLabels.plant)} alt=""/> }
        { choosenLabels.plant && choosenLabels.plant === 'plant5' && <img className="fixed-plant5" src={findPic(choosenLabels.plant)} alt=""/> }
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
        <img ref="submit" className="submit-animation" src={submitBtn} alt="" onClick={canSubmit ? this.handleSubmit : null }/>
      </div>
    )
  }
}

export default Home