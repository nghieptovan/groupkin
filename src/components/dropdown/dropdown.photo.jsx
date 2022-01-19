import React from 'react'
import Link from 'src/components/link'

const LiDropdownPhoto = (props)=>{
  let {obj}=props
  return(
    <li>
      <Link to={obj.link}>
      <i className={ obj.iconClassname }></i>
        {obj.teks}
      </Link>
    </li>
  )
}
export default LiDropdownPhoto
