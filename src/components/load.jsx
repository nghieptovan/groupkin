import React,{Component} from 'react'
import Loading from './loading';
export default class Load extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let { statusLoad = 0, totalItem = 0 } = this.props;
    return(
      <tr className="odd" style={{ height: "500px", position: 'relative', backgroundColor: "unset" }}>
        <td
          valign="top"
          colSpan="8"
          className="dataTables_empty text-center"
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            borderTop: '0'
          }}
        >                          
          { statusLoad > 1 ?  (totalItem == 0 ? <p>No item found.</p> : '' ) : <Loading /> }
        </td>
      </tr>
    )
  }
}
