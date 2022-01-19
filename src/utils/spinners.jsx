import React,{Component} from 'react'
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/ClipLoader";

class SpinLoader extends Component{
  constructor(){
    super()
  }

  render(){
    const override = css`
    display: block;
    position: absolute;
    width: 50px;
    left: calc(50% - 25px);
    `;

    let {loading , color}=this.props
    return(
      <CircleLoader
      color={color} loading={loading} css={override} size={50} />
    )
  }
}
export default SpinLoader;
