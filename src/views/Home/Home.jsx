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
@observer
class Home extends Component {
  @observable data = new HomeData()

  getCookie = idKey => { // 根据cookie名称获取值
    if(document.cookie.includes(idKey)) {
      let tigerId = document.cookie.split('; ').filter(item => item.includes('tigerGameId'))[0].split('=')[1]
      return decodeURIComponent(tigerId)
    }
    return ''
  }

  componentDidMount() {
    when(
     () => this.data.canSubmit,
     () => this.refs.submit.style.animationPlayState = "running"
    )
  }

  findPic = key => {
    const type = key.substring(0, key.length - 1)
    const arr = labels[type]
    return arr.filter(item => item.key === key)[0].icon
  }

  handleSubmit = () => {
    this.data.setDataByKey('clicked', 1)
    this.data.setDataByKey('showCloud', 1)
  }

  render() {
    const { currentType, choosenLabels, showCloud } = this.data.store
    const { setDataByKey, updateChoosenLabels, hideLabel, canSubmit } = this.data
    return (
      <div className="home">
        { showCloud == 0 ? null : <Cloud /> }
        {/* 背景图 */}
        <img className="bg-img" src={homebg.default} alt=""/>
        {/* 选中摆件位置 */}
        { choosenLabels.air && choosenLabels.air !== 'air5' && <img className="fixed-air" src={this.findPic(choosenLabels.air)} alt=""/> }
        { choosenLabels.air && choosenLabels.air === 'air5' && <img className="fixed-air5" src={this.findPic(choosenLabels.air)} alt=""/> }
        { choosenLabels.pet && <img className="fixed-pet" src={this.findPic(choosenLabels.pet)} alt=""/> }
        { choosenLabels.staff && <Staff url={this.findPic(choosenLabels.staff)}/> }
        { choosenLabels.plant && choosenLabels.plant !== 'plant5' && <img className="fixed-plant" src={this.findPic(choosenLabels.plant)} alt=""/> }
        { choosenLabels.plant && choosenLabels.plant === 'plant5' && <img className="fixed-plant5" src={this.findPic(choosenLabels.plant)} alt=""/> }
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