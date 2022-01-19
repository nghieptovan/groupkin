import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/action/user'
import _ from 'lodash'
import Link from 'src/components/link'
import Status from 'src/components/util/status'
import Date from 'src/components/util/date'
import localStore from 'src/utils/local-storage';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "../input/Input";
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import slug from 'slug'

import Select from "react-select";
import { buildCategoryManageDropDown } from "../../utils/post-filter";


const CONTENT_URL = process.env.REACT_APP_CONTENT;

class AddItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            type: props.type,
            endpoint: props.endpoint,
            itemAdd : {
                title: '',
                description: '',
                label: '',
                slug: '',
                thunmbnail: '',
                replace_image: '',
                banner_top: '',
                banner_sidebar: '',
                banner_endpost: '',
                status: true
            },
            search: props.datasearch,
            selectedCategory: {
                label: "Root category",
                value: "" 
            },
            categories: [],
            datacategory: props.datacategory
            
        };
    }

    closeModal = () => {
        this.setState({ showModal: false});
      };
    
    openModal = () => {
    this.setState({ showModal: true });
    };

    setValue = (type, value) => {
        let {itemAdd} = this.state;
        itemAdd[type] = value;
        this.setState({itemAdd: itemAdd})
    }

    handleChange(files, type) {
        let { itemAdd } = this.state;
        let file = files[0]; 
        if ( /(jpe?g|png|gif)$/i.test(file.type) ) {
        }

        
    }

    updateStatus = (value) => {
        let { itemAdd } = this.state;
        itemAdd.active = value;
        this.setState({itemAdd});
    }

    saveDataNew = () => {
        let { itemAdd } = this.state;
        ApiService.post(`${this.state.endpoint}`, itemAdd).then(result => {
            toast.success(`${this.state.type} đã thêm thành công`);
            window.location.reload();
        });
    }

    selectedFilterCategory = (value) => {
        this.setState({selectedCategory: value })
    
    }

    searchData(value){
        if(value == ""){
            this.sendData("");
        }
            
    }
    
    sendData(data){
        this.setState({search: data})
        this.props.getdata(data);
    }


    render() {
        const { type, itemAdd: {
            title, description, label, slug, thumbnail, replace_image, banner_endpost, banner_sidebar, banner_top, status
        } } = this.state;

        return (  
            <div className="card-header row">
                          
                <div className="col-12 col-md-2 my-1 my-md-0 px-3 px-md-2">
                    <button className="btn btn-success btn-block" onClick={() => this.openModal()}>Thêm {type}</button>
                </div>
                <div className="col-12 col-md-2 my-1 my-md-0 ml-auto px-3 px-md-2">
                    <Input
                    icon="search"
                    placeholder="Tìm kiếm"
                    value={this.state.search}
                    onChange={value => {
                        this.searchData(value);
                    }}
                    onSubmit={value => {
                        this.sendData(value);
                    }}
                    />
                </div>
                <Modal
                  show={this.state.showModal}
                  onHide={this.closeModal}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
               <Modal.Header closeButton>
                    <Modal.Title>Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-6">
                    <label>Label</label>
                    <Input
                        icon=""
                        placeholder="Label"
                        value={label}
                        onChange={value => {
                            this.setValue('label', value);
                        }}
                        onSubmit={value => {}}
                    />
                    </div>
                    <div className="col-6">
                        <label>Slug</label>
                        <Input
                        icon=""
                        placeholder="Url"
                        value={slug}
                        onChange={value => {
                            this.setValue('slug', value);
                        }}
                        onSubmit={value => {}}
                    />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                    <label>Title</label>
                    <Input
                        icon=""
                        placeholder="Title"
                        value={title}
                        onChange={value => {
                            this.setValue('title', value);
                        }}
                        onSubmit={value => {}}
                    />
                    </div>
                    <div className="col-6">
                    <label>Description</label>
                    <Input
                        icon=""
                        placeholder="Description"
                        value={description}
                        onChange={value => {
                            this.setValue('description', value);
                        }}
                        onSubmit={value => {}}
                    />
                    </div>
                </div>
              

                <div className="row mt-4">
                    <div className="col-6">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="thumbnail" onChange={ (e) => this.handleChange(e.target.files, 'thumbnail') }/>
                        { thumbnail &&  <img src={thumbnail} className="image-category" />}
                            <label className="custom-file-label" htmlFor="customFile">{thumbnail || 'Thumbnail'}</label>
                            </div>
                        </div>
                    <div className="col-6">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="replace_image" onChange={ (e) => this.handleChange(e.target.files, 'replace_image') }/>
                            { replace_image &&  <img src={replace_image} className="image-category" />}
      
                            <label className="custom-file-label" htmlFor="customFile">{replace_image || 'Hình thay thế'}</label>
                            </div>
                        
                    </div>
                </div>
                
                <div className="row mt-4">
                    <div className="col-6">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="banner_top" onChange={ (e) => this.handleChange(e.target.files, 'banner_top') } />
                            { banner_top &&  <img src={banner_top} className="image-category" />}
      
                            <label className="custom-file-label" htmlFor="customFile">{banner_top || 'Banner top'}</label>
                            </div>
                        </div>
                    <div className="col-6">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="banner_sidebar" onChange={ (e) => this.handleChange(e.target.files, 'banner_sidebar') } />
                            { banner_sidebar &&  <img src={banner_sidebar} className="image-category" />}
                            <label className="custom-file-label" htmlFor="customFile">{banner_sidebar || 'Banner Sidebar'}</label>
                            </div>
                        
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-6">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="banner_endpost" onChange={ (e) => this.handleChange(e.target.files, 'banner_endpost') }  />
                            { banner_endpost &&  <img src={banner_endpost} className="image-category" />}
                            <label className="custom-file-label" htmlFor="customFile">{banner_endpost || 'Banner Endpost'}</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <label>Status</label>
                        <div className="float-right">
                        <BootstrapSwitchButton checked={status} onChange={(check) => {this.setValue('status', check) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                        </div>
                    </div>
                   
                </div>

               
            
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={this.closeModal}>Cancel</Button>
                    <Button onClick={this.saveDataNew}>Save</Button>
                </Modal.Footer>
            </Modal>
            
            </div>
        )
    }
  
};
export default connect( store => {
    return {
        login: store.loginInfo,
        config: store.config
      };
    } , dispatch => {
    return {
      setCurrentUser: (value) => { dispatch(userActions.setCurrentUser(value))},    
    }
})(AddItem)
