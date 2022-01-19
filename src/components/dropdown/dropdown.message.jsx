import React from 'react'
import asset from 'src/utils/asset'
const LiDropdownMessage = (props)=>{
  let { obj } = props
  return(
    <li className="item first-item">
      <a href="clickme" onClick={e=>e.preventDefault()}>
      <img src={asset(obj.pic)} alt={'Photos Profile of ' + obj.name} />
      <span className="content">
      <span className="content-headline">{obj.name}</span>
      <span className="content-text">{obj.teks}</span>
      </span>
      <span className="time"><i className="fa fa-clock-o"></i>{obj.waktu}</span>
      </a>
    </li>
  )
}
export default LiDropdownMessage
