import React,{Component} from 'react'
import {connect} from 'react-redux'
import localStore from 'src/utils/local-storage'
class LiConfigList extends Component{
  constructor(){
      super();
      this.state={checkBox:false};
  }
  async componentDidMount ()
  {
      let { obj } = this.props ,temp ;
      temp = await localStore.get(obj.id)
      this.setState({
        checkBox: temp === 'true' ? true : false
      })

  }
  async handleClick(e)
  {
      let id = e.currentTarget.getAttribute('data-id'),value = this.state.checkBox;
      await localStore.set(id,!value)
      this.setState({
        checkBox:!value
      })
  }

  render(){
      let { obj } = this.props ;

    switch( obj.id ){
      case 'config-fixed-header':
        let KLASS = document.body.getAttribute('class') ;
        KLASS = KLASS == null ? '' : KLASS ;
        KLASS = this.state.checkBox ? (KLASS.match(/fixed-header/) ? KLASS : KLASS + ' fixed-header'  )  : KLASS.replace(/fixed-header/g,'') ;
        document.body.className = KLASS;
        break;
      case 'config-fixed-footer':
        this.state.checkBox === true ? document.body.classList.add('fixed-footer') : document.body.classList.remove('fixed-footer');
        break;
      case 'config-boxed-layout':
        this.state.checkBox === true ? document.body.classList.add('boxed-layout') : document.body.classList.remove('boxed-layout');
        break;
    default:break;
  }

      return(
          <li>
              <div className="checkbox-nice" onClick={this.handleClick.bind(this)} data-id={ obj.id}>
              <input onChange={e=>e} type="checkbox" id={ obj.id} checked={this.state.checkBox ? true : false} />
              <label > { obj.name} </label>
              </div>
          </li>
      );
  }
}

export default connect()(LiConfigList)
