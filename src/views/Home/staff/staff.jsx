import React from 'react'

import './staff.less'

export default function Staff(props) {
  const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 12个元素的定长数组
  return (
    <div className="staff-all">
      { arr.map((item, index) => <img key={index}   className={`staffFixed staffFixed-${index}`} src={props.url} alt=''/>) }
    </div>
  )
}