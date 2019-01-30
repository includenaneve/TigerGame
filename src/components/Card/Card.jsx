import React from 'react'

import './Card.less'

class Card extends React.Component {
  render() {
    return (
      <div className="card-wrapper" onClick={() => this.props.removeCard(this.props.index)}>
        <img className="card-bg" src={this.props.url} alt=""/>
      </div>
    )
  }
}

export default Card