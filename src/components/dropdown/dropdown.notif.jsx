import React from 'react'
import Link from 'src/components/link'

const LiDropdownNotif = ( props ) =>{
  let { obj } = props
  return(
    <li className="item">
      <a href="clickme" onClick={e=>e.preventDefault()} >
        <i className={ obj.iconClassname }></i>
        <span className="content">{obj.teks}</span>
        <span className="time"><i className="fa fa-clock-o"></i>{obj.waktu}</span>
      </a>
    </li>
  )
}

export default LiDropdownNotif
