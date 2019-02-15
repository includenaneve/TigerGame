import React from 'react'
import { observer } from 'mobx-react'

import './ResultCard.less'
import Card from '@components/Card/Card'
import * as cards from '@images/tigergame/cards/export'
import { observable, computed } from 'mobx';

@observer
class ResultCard extends React.Component {

  @computed get currentCard() {
    return this.props.arr && this.props.arr.length > 0
  }

  render() {
    const { removeCard } = this.props
    return (
      <div className="result-card-wrapper" hidden={this.arr && this.arr.length <= 0}>
        {
          this.currentCard && <Card key={Math.random()} url={cards['card' + this.props.arr[0]]} removeCard={removeCard} />
        }
      </div>
    )
  }
}

export default ResultCard