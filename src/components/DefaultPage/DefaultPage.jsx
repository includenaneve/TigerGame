import React, { Component } from 'react'
import * as defaultPic from '@images/common/default.jpg'

import './DefaultPage.less'

export default class DefaultPage extends Component {
  render() {
    return (
      <div className="default-page">
        <img className="pic" src={defaultPic.default} alt=""/>
        <div className="text" >{this.props.text}</div>
      </div>
    )
  }
}