import React from 'react'

import * as pics from '@images/tigergame/cloud/export'
import './Cloud.less'

export default function Cloud(props) {
  return (
    <div className="clouds-wrapper">
      <img className="cloud cloud-1" src={pics.cloud1} alt=""/>
      <img className="cloud cloud-2" src={pics.cloud5} alt=""/>
      <img className="cloud cloud-3" src={pics.cloud3} alt=""/>
      <img className="cloud cloud-4" src={pics.cloud4} alt=""/>
      <img className="cloud cloud-5" src={pics.cloud1} alt=""/>
      <img className="cloud cloud-6" src={pics.cloud3} alt=""/>
      <img className="cloud cloud-7" src={pics.cloud5} alt=""/>
      <img className="cloud cloud-8" src={pics.cloud2} alt=""/>
      <img className="cloud cloud-9" src={pics.cloud4} alt=""/>
      <img className="cloud cloud-10" src={pics.cloud1} alt=""/>
      <img className="cloud cloud-11" src={pics.cloud5} alt=""/>
      <img className="cloud cloud-12" src={pics.cloud3} alt=""/>
    </div>
  )
}