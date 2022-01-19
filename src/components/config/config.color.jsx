import React,{Component} from 'react'
import {connect} from 'react-redux'
import localStore from 'src/utils/local-storage'

class LiConfigColor extends Component{

  async handleClick(e){
      let skin = e.currentTarget.getAttribute('data-skin'),temp ;
      temp = await localStore.get('body-tema')
      document.body.classList.add( skin ) ;
      document.body.classList.remove( temp );
      await localStore.set('body-tema',skin)
  }

  render()
  {
      let { obj } = this.props, kelas = 'skin-changer link-button ' + obj.klass ;
      return(
          <li>
              <button onClick={this.handleClick.bind(this)}
                  className={kelas} data-skin={obj.name}
                  data-toggle="tooltip" title={obj.title}
                  style={obj.stile} > </button>
          </li>
      );
  }
}


export default connect()(LiConfigColor)
