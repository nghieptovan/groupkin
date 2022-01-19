import React,{Component} from 'react'
import { withRouter } from 'react-router'

class Link extends Component{

  handleEventOnClick(e){
    e.preventDefault()
    let {match} = this.props
    
    if(match.url !== e.currentTarget.getAttribute('href') ){
      this.props.history.push(e.currentTarget.getAttribute('href'));
    }

  }

  render(){
    let { children='',to='#', className } = this.props
    return(
      <a onClick={this.handleEventOnClick.bind(this)} href={to} className={className}>
        {children}
      </a>
    )
  }
}

export default withRouter(Link)
