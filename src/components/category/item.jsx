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

import './category.scss';
import Select from "react-select";
import { buildCategoryManageDropDown } from "../../utils/post-filter";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class CategoryItem extends Component {
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
            config: props.config, 
            type: props.type,
            endpoint: props.endpoint,
            categories: [],
            parent: props.parent || null,
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

        const { config: {listCategory} } = this.props;

        let buildCate = buildCategoryManageDropDown(listCategory);
        // let fCategories = [{ label:"Chọn chuyên mục", value: { url: "" } }];
        // fCategories = fCategories.concat(buildCate);
        this.setState({
            categories: buildCate
          });
    }


    viewSubCategory = () => {
        this.props.viewSubCategory(this.props.item)
    }

    editContent(item) {
        console.log(item);
        
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
        console.log(value);
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

    render() {
        const { item, idx, config, level } = this.props;
        let { item: {name,status,url, title, description, thumbnail, replace_image, banner_top, banner_sidebar, banner_endpost}, 
        categories, selectedCategory } = this.state;
       
        return (
           
           
            <tr key={`post-${idx}`}>

                <td className="title">
                    <span style={{ marginLeft: level * this.state.marginsub + 'px' }}>
                        {level == '2' ? <i className="fas fa-arrow-alt-circle-right mr5" style={{ color: '#c0eb75' }}></i> : ''}
                        {level == '0' ? <i className="fas fa-angle-right mr5" style={{ color: '#f06595' }}></i> : ''}
                        {level == '1' ? <i className="fas fa-angle-double-right mr5" style={{ color: '#22b8cf' }}></i> : ''}
                        {item.name || 'Chưa đặt tên'}
                    </span>
                    <div className={"tools tools-posts" + (this.state.onHover ? ' active' : '')}>{(this.state.showEdit) &&
                        <Link to={`/posts/edit/${item._id}`} className="btn btn-danger btn-sm">
                            <i className="fas fa-pencil-alt"></i> Edit
                    </Link>
                    }      </div>
                </td>
                <td >
                    <span>{item.url}</span>
                </td>
                <td >
                    <span>{item.status ? 'Bật' : 'Tắt'}</span>
                </td>


                <td>
                    <button onClick={() => this.editContent(item)} className="btn btn-success btn-sm">
                        <i className="fas fa-pencil-alt"></i> Edit
                    </button>
                   
                    <button onClick={() => this.confirmAction(item.id)} className="btn btn-danger ml-1 btn-sm">
                        <i className="fas fa-trash-alt"></i> Delete
                    </button>
               
                </td>
                <Modal
                show={this.state.showModal}
                onHide={this.closeModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Danh mục</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-6">
                    <label>Label</label>
                    <Input
                        icon=""
                        placeholder="Label"
                        value={name}
                        onChange={value => {
                            this.setValue('name', value);
                        }}
                    />
                    </div>
                    <div className="col-6" style={{ zIndex: 9999 }}>
                    <label>Danh mục cha</label>
                    <Select
                            value={selectedCategory}
                            options={categories}
                            placeholder="Chọn danh mục"
                            onChange={this.selectedFilterCategory}
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
                    />
                    </div>
                </div>
                <div className="row mt-4">
                     <div className="col-6">
                        <label>Url</label>
                        <Input
                        icon=""
                        placeholder="Url"
                        value={url}
                        onChange={value => {
                            this.setValue('url', value);
                        }}
                    />
                    </div>

                    <div className="col-6">
                    <label>Status</label>
                    <div className="float-right">
                    <BootstrapSwitchButton checked={status} onChange={(check) => {this.setState({ status: check }) }}
                        onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                    </div>
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
                   
                </div>

               
            
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={this.closeModal}>Cancel</Button>
                    <Button onClick={this.saveData}>Save</Button>
                </Modal.Footer>
            </Modal>
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
})(CategoryItem)
