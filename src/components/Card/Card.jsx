import React from 'react'
import * as close from '@images/tigergame/close.png'

import './Card.less'

class Card extends React.Component {
  render() {
    return (
      <div className="card-wrapper">
        <img className="card-bg" src={this.props.url} alt=""/>
        <img src={close.default} alt="" className="close-btn" onClick={this.props.removeCard}/>
      </div>
    )
  }
}

export default Card