import React, { Component } from 'react'
import { observer } from 'mobx-react'

import './Home.less'
import * as homebg from '@images/tigergame/home.png'
import { types, labels } from '@constants/constants'
import HomeData from './HomeData'
import { observable } from 'mobx'
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
  }

  findPic = key => {
    const type = key.substring(0, key.length - 1)
    const arr = labels[type]
    return arr.filter(item => item.key === key)[0].icon
  }

  render() {
    const { currentType, choosenLabels } = this.data.store
    const { setDataByKey, updateChoosenLabels, hideLabel } = this.data
    return (
      <div className="home">
        <img className="bg-img" src={homebg.default} alt=""/>
        { choosenLabels.air && <img className="fixed-air" src={this.findPic(choosenLabels.air)} alt=""/> }
        { choosenLabels.pet && <img className="fixed-pet" src={this.findPic(choosenLabels.pet)} alt=""/> }
        { choosenLabels.staff && <img className="fixed-staff" src={this.findPic(choosenLabels.staff)} alt=""/> }
        { choosenLabels.plant && <img className="fixed-plant" src={this.findPic(choosenLabels.plant)} alt=""/> }
        <img src="" alt=""/>
        <div className="main-wrapper">
          <div className="type-wrapper">
            {
              types.map(item => {
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
            {
              labels[currentType] && labels[currentType].map(item => {
                return (
                  <div key={item.key} className='label-box' onClick={() => updateChoosenLabels(item.key)}>
                    { hideLabel !== item.key ? <img className="label-icon" src={item.icon} alt=""/> : null }
                    { hideLabel !== item.key ? <div className="label-dec">{item.name}</div> : <div>选中</div> }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Home