import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as coinActions from '../../store/action/coin'
import _ from 'lodash'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "../input/Input";
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Select from 'react-select';
import { formatterCurrency, formatterNumber } from "../../utils/post-filter";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const promotionTypes = [
    { value: 'CC', label: 'Cinema Coin' },
    { value: 'MN', label: 'Money' },
    { value: 'ND', label: 'No discount' }
]
class PromotionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: 'Promotion',
            marginsub: 50,
            showEdit: false,
            showModalAdd: false,
            onHover: false,
            activeAdd: false,
            item: props.item,
            idx: props.idx,
            promotionType: promotionTypes,
            currentPromotion: _.filter(promotionTypes, (prom) => {
                return prom.value == props.item.PrmType
            })
        };

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.changePromotionStatus != nextProps.changePromotionStatus){
            if(nextProps.changePromotionStatus == 2){
                toast.success(`Promotion đã cập nhật thành công`);
                this.closeModal();
            }
            if(nextProps.changePromotionStatus == 3){
                toast.error(`Cập nhật thất bại.`);
            }
            
        }
        
    }

    editContent(item) {
        // this.setState({showModal: true})
        this.props.editContent(item);
    }

    closeModal = () => {
        this.setState({ showModal: false, showModalAdd: false });
      };
    
    openModal = () => {
        this.setState({ showModal: true });
    };

    setValue = (type, value) => {
        const {item} = this.state;
        item[type] = value;
        this.setState({ item })
    }

    saveData = () => {
        const { item } = this.state;
        this.props.changePromotion(item);
    }

    confirmAction(dataUpdate) {
        const options = {
          title: "Title",
          message: "Message",
          buttons: [
            {
              label: "Yes",
              onClick: () => alert("Click Yes")
            },
            {
              label: "No",
              onClick: () => alert("Click No")
            }
          ],
          childrenElement: () => <div />,
          customUI: ({ onClose }) => (
            <div className="custom-ui-alert">
              <h1>Bạn thực hiện thao tác?</h1>
              <div className="box">
                <div className="bg-d9534f" onClick={onClose}>
                  Không, cần xem lại
                </div>
                <div
                  className="bg-c7c6c5"
                  onClick={() => {
                    this.deleteContent(dataUpdate);
                    onClose();
                  }}
                >
                  Có, tiếp tục
                </div>
              </div>
            </div>
          ),
          closeOnEscape: true,
          closeOnClickOutside: true,
          willUnmount: () => { },
          onClickOutside: () => { },
          onKeypressEscape: () => { }
        };
    
        confirmAlert(options);
    }

    hoverRow(status) {
        this.setState({ onHover: status });
    }

    changeSelect(value) {
        if(value){
            this.setState({ currentPromotion: value }, () => {
                this.setValue('PrmType', value.value);
             });
        }            
    }

    render() {
        let { item, idx, showModal, modalTitle, promotionType, currentPromotion } = this.state;
        return (
           
            <tr key={`post-${idx}`}  onMouseEnter={() => this.hoverRow(true)} onMouseLeave={() => this.hoverRow(false)}>
                <td className="title">
                    <span>
                        {item.PrmNo || '---'}
                    </span>
                    <div className={"tools tools-posts" + (this.state.onHover ? ' active' : '')}>
                        <span onClick={() => this.editContent(item)} className="btn btn-danger btn-sm">
                              <i className="fas fa-pencil-alt"></i> View detail
                        </span>
                    </div>
                </td>
                <td>
                    <span>{item.PrmName || '-'}</span>
                </td>
                <td>
                    <span>{item.PrmDesc || '-'}</span>
                </td>
                <td>
                    <span>{item.PrmRate +'%' || '-'}</span>
                </td>
                <td>
                    <span>{(item.PrmType == 'CC' ? 'Cinema Coin' : 'Money') || '-'}</span>
                </td>  
                <td>           
                    <p className={item.PrmEnable == 'Y' ? "btn btn-success btn-sm" : "btn btn-danger btn-sm" } ><span>{item.PrmEnable || '-'}</span></p>
                </td>              
                <td>
                    <span>{item.ModifyDts || '-'}</span>
                </td>              
            </tr>

          
        )
    }

};
export default connect(store => {
    return {
        changePromotionStatus: store.coin.changePromotionStatus
    };
}, dispatch => {
    return {
        changePromotion: (value) => { dispatch(coinActions.changePromotion(value)) }
    }
})(PromotionItem)
