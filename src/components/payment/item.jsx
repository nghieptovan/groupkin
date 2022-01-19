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
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import slug from 'slug'

import Select from "react-select";
import { formatterCurrency, buildDiscountString } from "../../utils/post-filter";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class PaymentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginsub: 50,
            showEdit: false,
            showModalAdd: false,
            onHover: false,
            activeAdd: false,
            item: props.item,
            payment_type: props.payment_type,
            idx: props.idx,
            // config: props.config, 
            // type: props.type,
            // endpoint: props.endpoint,
            categories: [],
            // parent: props.parent || null,
            itemAdd : {
                active: true,
                label: "",
                slug: ""
            },
            selectedCategory: {
                label: "Root category",
                value: "" 
            },


        };

    }
    componentDidMount(){

        // const { config: {listCategory} } = this.props;

        // let buildCate = buildCategoryManageDropDown(listCategory);
        // // let fCategories = [{ label:"Chọn chuyên mục", value: { url: "" } }];
        // // fCategories = fCategories.concat(buildCate);
        // this.setState({
        //     categories: buildCate
        //   });
    }


    viewSubCategory = () => {
        this.props.viewSubCategory(this.props.item)
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

    addContent() {
        this.setState({showModalAdd: true })
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
        ApiService.put(`${this.state.endpoint}/${this.state.item.id}`, this.state.item).then(result => {
            this.setState({item: result}, () => {
                toast.success(`${result.name} đã cập nhật thành công`);
                this.closeModal();
            });
        });
    }

    handleChange(files, type) {
        let { item } = this.state;
        let file = files[0]; 
        if ( /(jpe?g|png|gif)$/i.test(file.type) ) {
        }

        
    }

    convertDataURIToBinary(dataURI) {
        var BASE64_MARKER = ';base64,';
        var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = dataURI.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
    
        for(let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    selectedFilterCategory = (value) => {
        this.setState({selectedCategory: value })
    
    }

    deleteContent(idContent){
        ApiService.delete(`${this.state.endpoint}/${idContent}`).then(result => {
            toast.success(`${this.state.type} đã xoá thành công`);
            window.location.reload();
            this.closeModal();
        });
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
        const { item, idx } = this.props;
        let { item : {detail : {session_id, sale_date, amount, snack_amount, ticket_amount, user_email, user_name, user_phone, seats, concessions}} , payment_type } = this.state;

        let discountItem = item.TextSuccess ? JSON.parse(item.TextSuccess) : {};
        discountItem.after_discount = discountItem.after_discount || item.total_amount;

        return (
            <>
           
            <tr key={`post-${idx}`}  onMouseEnter={() => this.hoverRow(true)} onMouseLeave={() => this.hoverRow(false)}>
                <td className="title">
                    <span>
                        {item.req_no || '---'}
                    </span>
                    <div className={"tools tools-posts" + (this.state.onHover ? ' active' : '')}>
                        <span onClick={() => this.editContent(item)} className="btn btn-danger btn-sm">
                              <i className="fas fa-pencil-alt"></i> View detail
                        </span>
                    </div>
                </td>
                <td>
                    <span>{item.trans_no || '-'}</span>
                </td>
                <td>
                    <span>{item.partner_id || '-'}</span>
                </td>
                <td>
                    <p className="text-success">{formatterCurrency(item.total_amount) || '-'}</p>
                    <p className={item.total_amount == discountItem.after_discount ? "text-success" : "text-danger" } >{formatterCurrency(discountItem.after_discount) || '-'}</p>
                </td>               
                
                <td>
                    <span>{seats || '-'}</span>
                </td>
                <td>
                    <span>{item.cinema_id || '-'}</span>
                </td>              
               
                <td>
                    <span>{user_name || '-'}</span>
                </td>
                <td>
                    <span>{user_phone || '-'}</span>
                </td>
                <td>
                    <span>{user_email || '-'}</span>
                </td>
                <td>
                    <span>{item.film_name || '-'}</span>
                </td>
                <td>
                    <span>{moment(item.trans_dts).format('DD/MM/YYYY hh:mm A') || '-'}</span>
                </td>
            </tr>
            <Modal
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
                    {/* <Button onClick={this.saveData}>Save</Button> */}
                </Modal.Footer>
            </Modal>
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
})(PaymentItem)
