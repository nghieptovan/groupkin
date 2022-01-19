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
class ChangePromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: 'Promotion',
            marginsub: 50,
            showEdit: false,
            showModal: false,
            onHover: false,
            activeAdd: false,
            item: props.item,
            promotionType: promotionTypes,
            currentPromotion: _.filter(promotionTypes, (prom) => {
                return prom.value == props.item.PrmType
            })
        };

    }
    componentDidMount() {
        const {showModal,item} = this.props
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
        let { item, showModal, modalTitle, promotionType, currentPromotion } = this.props;
        console.log(item);
        console.log(showModal);
        return (
           
            <Modal
                show={showModal}
                onHide={this.closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                  <Modal.Header closeButton>
                      <Modal.Title>{modalTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div className="row">
                      <div className="col-4">
                          <label>Name</label>
                          <Input
                              icon=""
                              placeholder="user_email"
                              value={`${item.PrmName}`} 
                              onChange={value => {
                                  this.setValue('PrmName', value);
                              }}                 
                          />
                      </div>
                      <div className="col-4">
                          <label>Rate</label>
                          <Input
                              icon=""
                              placeholder="Rate"
                              value={`${item.PrmRate}`}
                              onChange={value => {
                                  this.setValue('PrmRate', value);
                              }}                            
                          />
                      </div>
                      <div className="col-4">
                          <label>Description</label>
                          <Input
                          icon=""
                          placeholder="Description"
                          value={item.PrmDesc}
                          onChange={value => {
                              this.setValue('PrmDesc', value);
                          }}
                      />
                      </div>
                  </div>

                  <div className="row mt-4">
                      <Select
                          value={currentPromotion}
                          className="col-4"
                          options={promotionType}
                          onChange={value => this.changeSelect(value)}
                          menuPosition="fixed"
                          placeholder="Promotion Type"
                          isClearable={true}
                      />                      
                  </div>
                  <div className="row mt-4">
                      <div className="col-12">                        
                          <BootstrapSwitchButton checked={item.PrmEnable == 'Y' ? true : false} onChange={(check) => {this.setValue('PrmEnable', check ? 'Y' : 'N') }}
                              onstyle="success" offstyle="danger" size="sm" onlabel='Enable' offlabel='Disable' width="120" />
                      </div>
                  </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button className="btn-success" onClick={this.saveData}>Save</Button>
                      <Button className="btn-danger" onClick={this.closeModal}>Cancel</Button>                    
                  </Modal.Footer>
              </Modal>

          
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
})(ChangePromotion)
