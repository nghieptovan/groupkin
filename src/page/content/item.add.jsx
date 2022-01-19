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
import Input from "../../components/input/Input";
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import slug from 'slug'
const CONTENT_URL = process.env.REACT_APP_CONTENT;

class AddItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            type: props.type,
            endpoint: props.endpoint,
            itemAdd : {
                active: true,
                label: "",
                slug: ""
            },
            search: props.datasearch
        };
    }

    closeModal = () => {
        this.setState({ showModal: false});
      };
    
    openModal = () => {
    this.setState({ showModal: true });
    };

    updateLabel = (value) => {
        let { itemAdd } = this.state;
        itemAdd.label = value;
        itemAdd.slug = slug(value);
        this.setState({itemAdd});
    }

    updateSlug = (value) => {
        let { itemAdd } = this.state;
        itemAdd.slug = value;
        this.setState({itemAdd});
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
            this.closeModal();
            this.props.addeddata(result);
            this.setState({
                itemAdd : {
                    active: true,
                    label: "",
                    slug: ""
                }
            });
            
            
           
        });
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
        const { item, idx, config, type, slug, label, active, itemAdd, activeAdd } = this.state;
        
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
                      <Modal.Title>{type}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-6">
                        <label>Label</label>
                        <Input
                          icon=""
                          placeholder="Label"
                          value={itemAdd.label}
                          onChange={value => {
                              this.updateLabel(value)
                        
                          }}
                      />
                      </div>
                      <div className="col-6">
                      <label>Slug</label>
                        <Input
                          icon=""
                          placeholder="Slug"
                          value={itemAdd.slug}
                          onChange={value => {
                            this.updateSlug(value)
                        
                          }}
                      />
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-6">
                      <label>Status</label>
                      <div className="float-right">
                      <BootstrapSwitchButton checked={itemAdd.active} onChange={(check) => {
                          this.updateStatus(check)
                          }}
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
