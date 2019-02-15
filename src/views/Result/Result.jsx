import React from 'react'
import * as pics from '@images/tigergame/result/export'
import * as gods from '@images/tigergame/gods/export'
import * as media from '@images/tigergame/media.png'
import html2canvas from 'html2canvas'

import './Result.less'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as won from '@audio/won.mp3'
import * as first from '@audio/first.mp3'
@observer
class Result extends React.Component {
  @observable dataUrl = null
  @action setDataUrl = url => {
    this.dataUrl = url
  }

  handleAgain = () => {
    this.props.history.push('/auth')
  }

  handleMetoo = () => {
    this.props.history.push('/auth')
  }

  imgLoaded = () => {
    const pics = document.getElementsByName('img')
    const funs = Object.keys(pics).map(index => {
      return new Promise((resolve, reject) => {
        if (pics[index].complete || pics[index].readyState === 4) {
          resolve(0)
        } else {
          pics[index].onload = () => {
            resolve(1)
          }
        }
      })
    })
    return new Promise((resolve, reject) => {
      Promise.all(funs).then((res) => {
        resolve(res)
      })
    })
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
    await this.imgLoaded()
    await this.audioLoaded()
    const canvas = await html2canvas(document.body)
    this.setDataUrl(canvas.toDataURL())
    const godArr = decodeURIComponent(this.props.match.params.godArr).split(',')
    const isWon = godArr[0] === godArr[1] && godArr[0] === godArr[2] && godArr[1] === godArr[2]
    if (isWon) {
      if (parseInt(godArr[0]) === 9) {
        this.refs.first && await this.refs.first.play()
      } else {
        this.refs.won && await this.refs.won.play()
      }
    }
  }

  render() {
    const godArr = decodeURIComponent(this.props.match.params.godArr).split(',')
    const isWon = godArr[0] === godArr[1] && godArr[0] === godArr[2] && godArr[1] === godArr[2]
    return (
      <div className="result-wrapper">
       <audio src={won.default} loop ref="won" preload='auto'></audio>
       <audio src={first.default} loop ref="first" preload='auto'></audio>
       {
         this.dataUrl
         ? <div className="fixed">
            <img className="final-pic" src={this.dataUrl} alt=""/>
           </div>
         : <div>
            <img className="result-bg" src={isWon ? pics.resultBg2 : pics.resultBg} alt=""/>
            <div className="gods-wrapper">
            {
              godArr && godArr.map((item, index) => {
                return <img className={`god god-${index}`} key={index} src={gods['god' + item]} alt=""/>
              })
            }
            </div>
            {
              isWon && <img className="fish" src={pics.fish} alt=""/>
            }
            {
              isWon && <img className="shuiyin" src={media.default} alt=""/>
            }
            <img className="qrcode" src={pics.qrcode} alt=""/>
         </div>
       }
       {
         this.dataUrl ? <div className="btn-wrapper">
         <img className="btn" src={pics.metoo} alt="" onClick={this.handleMetoo}/>
         <img className="btn" src={pics.again} alt="" onClick={this.handleAgain}/>
       </div> : null
       }
      </div>
    )
  }
}
export default Result