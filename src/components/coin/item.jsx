import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../store/action/post'
import _ from 'lodash'
import Link from 'src/components/link'
import Status from 'src/components/util/status'
import Date from 'src/components/util/date'
import localStore from 'src/utils/local-storage'
import ImageLoader from '../../components/image-loader/ImageLoader'
const CONTENT_URL = process.env.REACT_APP_CONTENT;
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "../../components/input/Input";
import { ToastContainer, toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import slug from 'slug'

import Select from "react-select";
import { formatterCurrency, formatterNumber } from "../../utils/post-filter";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class CoinItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginsub: 50,
            showEdit: false,
            showModalAdd: false,
            onHover: false,
            activeAdd: false,
            item: props.item,
            idx: props.idx,
            itemAdd : {
                active: true,
                label: "",
                slug: ""
            },
            selectedCategory: {
                label: "Root category",
                value: "" 
            }
        };

    }
    componentDidMount(){
    }

    editContent(item) {
        let cate = {
            label: "Root category",
            value: "" 
        }
        if(this.state.parent){
            cate.label = this.state.parent.name
            cate.value = this.state.parent.id
        }

        this.setState({showModal: true, selectedCategory: cate })
    }

    closeModal = () => {
        this.setState({ showModal: false, showModalAdd: false });
      };
    
    openModal = () => {
    this.setState({ showModal: true });
    };

    setValue = (type, value) => {
        let {item} = this.state;
        item[type] = value;
        this.setState({item: item})
    }


    saveData = () => {
        let { item, status, selectedCategory } = this.state;
        item.active = status;
        if(selectedCategory){
            item.category = selectedCategory.id
        }

    }
    
    deleteContent(idContent){

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

    render() {
        let { item, idx } = this.state;


        return (
            <>


            <tr key={`post-${idx}`}  onMouseEnter={() => this.hoverRow(true)} onMouseLeave={() => this.hoverRow(false)}>
                <td className="title">
                    <span>
                        {item.CoinID || '---'}
                    </span>
                    <div className={"tools tools-posts" + (this.state.onHover ? ' active' : '')}>
                        <span onClick={() => this.editContent(item)} className="btn btn-danger btn-sm">
                              <i className="fas fa-pencil-alt"></i> View detail
                        </span>
                    </div>
                </td>
                <td>
                    <span>{item.CoinName || '-'}</span>
                </td>
                <td>
                    <span>{formatterCurrency(item.Money_P) || '-'}</span>
                </td>
                <td>
                    <span>{formatterNumber(item.Coin_P) || '-'}</span>
                </td>
                <td>
                    <span>{item.PrmDesc || '-'}</span>
                </td>  
                <td>           
                    <p className={item.CoinEnable == 'Y' ? "btn btn-danger btn-sm" : "btn btn-success btn-sm" } ><span>{item.CoinEnable || '-'}</span></p>
                </td>              
                <td>
                    <span>{item.ModifyDts || '-'}</span>
                </td>              
            </tr>
            {/* <Modal
                show={this.state.showModal}
                onHide={this.closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{payment_type.label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-4">
                    <label>Email</label>
                    <Input
                        icon=""
                        placeholder="user_email"
                        value={user_email}                     
                    />
                    </div>
                    <div className="col-4">
                    <label>Name</label>
                    <Input
                        icon=""
                        placeholder="Name"
                        value={`${user_name}`}
                        
                    />
                    </div>
                    <div className="col-4">
                    <label>Phone number</label>
                    <Input
                        icon=""
                        placeholder="Phone number"
                        value={`${user_phone} `}
                        
                    />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-4">
                        <label>Settle Amount</label>
                        <Input
                        icon=""
                        placeholder="Settle Amount"
                        value={formatterCurrency(amount)}
                     
                    />
                    </div>
                    <div className="col-4">
                        <label>Ticket Amount</label>
                        <Input
                        icon=""
                        placeholder="Ticket Amount"
                        value={formatterCurrency(ticket_amount)}                     
                        />
                    </div>
                    <div className="col-4">
                        <label>Snack Amount</label>
                        <Input
                        icon=""
                        placeholder="Snack Amount"
                        value={formatterCurrency(snack_amount)}                     
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                    <label>Lotte TransNo</label>
                    <Input
                        icon=""
                        placeholder="Lotte TransNo"
                        value={item.trans_no}
                    />
                    </div>
                    <div className="col-4">
                    <label>Lotte Booking No</label>
                    <Input
                        icon=""
                        placeholder="Lotte Booking No"
                        value={item.booking_no}
                    />
                    </div>
                    <div className="col-4">
                    <label>{payment_type.label} TransNo</label>
                    <Input
                        icon=""
                        placeholder={`${payment_type.label} TransNo`}
                        value={item.partner_id}
                    />
                    </div>
                </div>
                {
                    payment_type.value == 10179 ? 
                    ( <div className="row mt-3">
                    <div className="col-3">
                    <label>Seat</label>
                    <Input
                        icon=""
                        placeholder="seats"
                        value={seats}                     
                    />
                    </div>
                    <div className="col-3">
                    <label>Concessions</label>
                    <Input
                        icon=""
                        placeholder="No concession"
                        value={concessions}
                    />
                    </div>
                    <div className="col-6">
                    <label>Discount</label>
                    <Input
                        icon=""
                        placeholder="No discount"
                        value={buildDiscountString(discountItem.key)}
                    />
                    </div>
                </div>
                    ):( <div className="row mt-3">
                    <div className="col-6">
                    <label>Seat</label>
                    <Input
                        icon=""
                        placeholder="seats"
                        value={seats}                     
                    />
                    </div>
                    <div className="col-6">
                    <label>Concessions</label>
                    <Input
                        icon=""
                        placeholder=""
                        value={concessions}
                    />
                    </div>
                  
                    </div>
                    )
                }
               
                <div className="row mt-3">
                    <div className="col-6">
                    <label>Session</label>
                    <Input
                        icon=""
                        placeholder="Label"
                        value={session_id}
                    />
                    </div>
                    <div className="col-6">
                    <label>Saledate</label>
                    <Input
                        icon=""
                        placeholder="Label"
                        value={sale_date}
                    />
                    </div>
                </div>
      

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={this.closeModal}>Cancel</Button>
                </Modal.Footer>
            </Modal> */}
            </>
          
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
})(CoinItem)
