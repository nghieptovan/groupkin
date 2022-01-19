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

class ContentItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            showModalAdd: false,
            onHover: false,
            label: props.item.label,
            value: props.item.value,
            active: props.item.active,
            desc: props.item.desc,
            activeAdd: false,
            item: props.item,
            idx: props.idx,
            config: props.config, 
            type: props.type,
            endpoint: props.endpoint,
            itemAdd : {
                active: true,
                label: "",
                slug: ""
            }
        };
    }
   
    editContent(item) {
        this.setState({showModal: true })
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

    setValueTitle = (value) => {

        this.setState({label: value})
    }
    setValueValue = (value) => {
        this.setState({value: value})
    }
    setValueDesc = (value) => {
        this.setState({desc: value})
    }

    saveData = () => {
        let { item, label, value, desc, active } = this.state;
        item.label = label;
        item.value = value;
        item.active = active;
        item.desc = desc;
        ApiService.put(`${this.state.endpoint}/${this.state.item.id}`, this.state.item).then(result => {
            this.setState({item: result}, () => {
                toast.success(`${this.state.type} đã cập nhật thành công`);
                this.closeModal();
            });
        });
    }


    render() {
        const { item, idx, config, type, value, label, active, desc, itemAdd, activeAdd } = this.state;
        return (  
            <tr key={`content-${idx}`}>
                <td><p>{item.label || '-'}</p></td>
                <td><p>{item.desc || '-'}</p></td>
                <td>{<Date updated_at={item.updatedAt} typecode='draft' />}</td>
              
                <td>
                    <button onClick={() => this.editContent(item)} className="btn btn-success btn-sm">
                        <i className="fas fa-pencil-alt"></i> Edit
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
                <Modal.Title>{type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-6">
                  <label>Label</label>
                  <Input
                    icon=""
                    disabled={true}
                    placeholder="Label"
                    value={label}
                    onChange={value => {
                        this.setValueTitle(value);
                    }}
                />
                </div>
                <div className="col-6">
                    <label>Value</label>
                    <Input
                        icon=""
                        placeholder="Value"
                        value={value}
                        disable
                        onChange={value => {
                            this.setValueValue(value);
                        }}
                    />
                </div>
              </div>

              <div className="row mt-3">
                
                <div className="col-6">
                    <label>Description</label>
                    <Input
                        icon=""
                        placeholder="Description"
                        value={desc}
                        disable
                        onChange={value => {
                            this.setValueDesc(value);
                        }}
                    />
                </div>
          
                
            </div>
            <div className="row mt-3">
                
             
                <div className="col-6">
                    <label>Status</label>
                    <div className="float-right">
                    <BootstrapSwitchButton checked={active} onChange={(check) => {this.setState({ active: check }) }}
                        onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
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
export default connect( store => {
    return {
        login: store.loginInfo,
        config: store.config
      };
    } , dispatch => {
    return {
      setCurrentUser: (value) => { dispatch(userActions.setCurrentUser(value))},    
    }
})(ContentItem)
