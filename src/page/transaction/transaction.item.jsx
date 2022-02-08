import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../store/action/post'
import { formatterCurrency, buildDiscountString } from "../../utils/post-filter";
import _ from 'lodash'
import moment from 'moment'
class TransactionItem extends Component {
    constructor(props) {
        super(props);
    }
    classBuilder = (type) => {
        let classReturn = 'badge fw-bolder '; 
        if(type == 'income'){
            classReturn += 'badge-light-success';
        }else if(type == 'topup'){
            classReturn += 'badge-light-primary';
        }else if(type == 'withdraw'){
            classReturn += 'badge-light-error';
        }else{
            classReturn += 'badge-light-warning';
        }
        return classReturn;
    }
   
    render() {
        const { item, idx } = this.props;


        return (
            <tr key={`transaction-${idx}`} className={`${idx % 2 == 0 ? 'odd' : 'even'}`}>
                <td>{item.id}</td>
                <td>{formatterCurrency(item.amount || 0)}</td>
                <td>
                    <div className={this.classBuilder(item.type)}>{item.type}</div>
                </td>
                <td data-order={item.updated_at}>
                    {moment(item.date_add).format('DD/MM/YYYY') || '-'}
                </td>
                <td>
                    {item.description}
                </td>
            </tr>
       
          
        )
    }

};
export default connect(store => {
    return {
        login: store.loginInfo,
        config: store.config
    };
}, dispatch => {
    return {
        setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
        deletePost: (value) => { dispatch(postActions.deletePost(value)) },
    }
})(TransactionItem)
