import React from 'react'
import { observer } from 'mobx-react'

import './ResultCard.less'
import Card from '@components/Card/Card'
import * as cards from '@images/tigergame/cards/export'

@observer
class ResultCard extends React.Component {
  render() {
    const { arr, removeCard } = this.props
    return (
      <div className="result-card-wrapper" hidden={this.arr && this.arr.length <= 0}>
        {
          arr && arr.map((arrIndex, index) => {
            return (
              <div className={`pailie-${index}`} >
                <Card key={arrIndex} url={cards['card' + arrIndex]} index={index} removeCard={removeCard}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ResultCard