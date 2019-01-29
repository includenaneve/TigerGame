import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import './ResultCard.less'
import Card from '@components/Card/Card'
import * as cards from '@images/tigergame/cards/export'

@observer
class ResultCard extends React.Component {
  @observable arr = null

  @action setArr = arr => {
    this.arr = arr
  }

  @action removeArr = index => {
    this.arr.splice(index, 1)
  }

  componentDidMount() {
    this.setArr(this.props.arr)
  }

  render() {
    return (
      <div className="result-card-wrapper" hidden={this.arr && this.arr.length <= 0}>
        {
          this.arr && this.arr.map((arrIndex, index) => {
            return (
              <div className={`pailie-${index}`} >
                <Card key={arrIndex} url={cards['card' + arrIndex]} index={index} removeArr={this.removeArr}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ResultCard