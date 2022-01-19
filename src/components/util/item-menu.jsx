
import React from 'react'
import Link from 'src/components/link'

export const ItemMenu = (props)=>{
    let { item , activemenu } = props;
    // console.log(props);
    const menuOpen = activemenu === item.link ? 'menu-open' : '';
    const haveSub = item.subItem.length > 0 ? 'has-treeview' : '';
    return (
        <li className={`nav-item ${haveSub} ${menuOpen}`}>
            <Link to={item.link} className="nav-link">
                <i className={item.classIcon}></i>
                <p>{item.title}</p>
            </Link>
        </li>
    )
}
