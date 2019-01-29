import React from 'react'

import './Card.less'

class Card extends React.Component {
  render() {
    return (
      <div className="card-wrapper">
        <img className="card-bg" src={this.props.url} alt=""/>
        <div className="card-close" onClick={() => this.props.removeArr(this.props.index)}>×</div>
      </div>
    )
  }
}

export default Card