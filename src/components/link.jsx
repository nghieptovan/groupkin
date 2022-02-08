import React,{Component} from 'react'
import { withRouter } from 'react-router'

class Link extends Component{
  constructor() {
    super();
    this.state = {
      classMenu: ''
    };
  }

  handleEventOnClick(e){
    e.preventDefault()
    let {match} = this.props
    
    if(match.url !== e.currentTarget.getAttribute('href') ){
      this.props.history.push(e.currentTarget.getAttribute('href'));
      this.setState({ classMenu: 'active' });
    }

  }

  render(){
    let { children='',to='#', className } = this.props
    let { classMenu } = this.state
    return(
      // <a onClick={this.handleEventOnClick.bind(this)} href={to} className={className}>
      //   {children}
      // </a>

      <a className={`menu-link ${classMenu}`} href={to}>
        {children}
      </a>


    )
  }
}

export default withRouter(Link)
