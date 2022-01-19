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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const CONTENT_URL = process.env.REACT_APP_CONTENT;


class ContentItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            showModalAdd: false,
            onHover: false,
            label: props.item.label,
            slug: props.item.slug,
            active: props.item.active,
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
    setValueSlug = (value) => {

        this.setState({slug: value})
        
    }

    saveData = () => {
        let { item, label, slug, active } = this.state;
        item.label = label;
        item.slug = slug;
        item.active = active;
        ApiService.put(`${this.state.endpoint}/${this.state.item.id}`, this.state.item).then(result => {
            this.setState({item: result}, () => {
                toast.success(`${this.state.type} đã cập nhật thành công`);
                this.closeModal();
            });
        });
    }

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
            window.location.reload();
            this.closeModal();
        });
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
        const { item, idx, config, type, slug, label, active, itemAdd, activeAdd } = this.state;
        return (  
            <tr key={`content-${idx}`}>
                <td><p>{item.label || '-'}</p></td>
                <td><p>{item.slug || '-'}</p></td>
                <td>{<Date updated_at={item.updatedAt} typecode='draft' />}</td>
                <td><p>{ type }</p></td>
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
                    <Modal.Title>{type}</Modal.Title>
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
                        this.setValueTitle(value);
                    }}
                />
                </div>
                <div className="col-6">
                <label>Slug</label>
                  <Input
                    icon=""
                    placeholder="Slug"
                    value={slug}
                    disable
                    onChange={value => {
                        this.setValueSlug(value);
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
