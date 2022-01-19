import React, {Component} from 'react'
import { connect } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import * as _ from 'lodash'
import { renderFormFieldAppend } from '../../utils/reduxField'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import { validateUpdateUserForm } from '../../utils/formValidation'
import Select from 'react-select'
import * as userActions from '../../store/action/user';
import localStorage from '../../utils/local-storage'
import UserCategory from './user.category';
import UserRole from './user.role';
import CreatorItem from './creator-item'

const validate = values => {
  return validateUpdateUserForm(values, false);
};

class UserEdit extends Component{
  constructor() {
    super();    
    this.state = {
      listRoles: null,
      listCategory: null,
      selectedRole: null, selectedCategory: null,
      primary_category: null,
      errorRole: false, errorCategory: false,
      valueRole: null, valueCategory: null,
      defaultRole: {}
    }
    toast.configure({
      autoClose: 3000,
      draggable: false,
    });
   }

   componentDidMount() {
    let userID = this.props.match.params.id;       
    this.props.getUserById(userID);
   }

   UNSAFE_componentWillReceiveProps(nextProps){
      const { user: nextUser, fileUpload: nextUpload, config: nextConfig, fields: nextFields} = nextProps;
      const { user, fileUpload, fields, config } = this.props;
      
      if(nextConfig.listRole){     
        let defaultRole = _.find(nextConfig.listRole, {type: 'ctv'});
        this.setState({listRoles: nextConfig.listRole, defaultRole: defaultRole})
      }

      if(user.getUserStatus !== nextUser.getUserStatus){
        if( nextUser.getUserStatus === 2){
          this.setDataForm(nextUser.currentUser);
        }
        if(nextUser.getUserStatus === 3){
          toast.error("User not found!!");
          this.props.history.push('/users');
        }
      }

      
   
      if(user.updateUserStatus !== nextUser.updateUserStatus && nextUser.updateUserStatus === 2){
        toast.success("Updated User Successfully!");
        this.props.history.push('/users');        
      }
      if(user.updateUserStatus !== nextUser.updateUserStatus && nextUser.updateUserStatus === 3){
          toast.success("Update User Error!");
      }

  }


  setDataForm(user){
    // console.log(user)
    let { role, categories, username, password, email, fullname, 
      can_publish, can_pr,can_view_royalties,can_set_royalties, can_homepage, blocked, can_live,
    can_read_other, can_edit_other, can_edit_publish, can_takedown, can_trash, can_view_ga, primary_category, no_banword, defaultRole, contentpennames, royalties_editors
    } = user;
    // console.log(user);

    role = role || defaultRole;
    role.value = role._id;
    role.label = role.name;
    this.props.dispatch(change('formUserEdit', 'username', username));
    this.props.dispatch(change('formUserEdit', 'password', password));
    this.props.dispatch(change('formUserEdit', 'email', email));
    this.props.dispatch(change('formUserEdit', 'fullname', fullname));
    this.setState({selectedRole: role, selectedCategory: categories, can_publish, can_pr,can_view_royalties,can_set_royalties, can_homepage, can_live, blocked,
      can_read_other, can_edit_other, can_edit_publish, can_takedown, can_trash, can_view_ga, primary_category, no_banword, contentpennames, royalties_editors});
  }

  handleUpdateUser() {
    let { selectedRole, selectedCategory, errorRole, errorCategory, can_publish, can_pr,can_view_royalties,can_set_royalties, can_homepage, can_live, blocked,
      can_read_other, can_edit_other, can_edit_publish, can_takedown, can_trash, can_view_ga, primary_category, no_banword, contentpennames, royalties_editors } = this.state;
    errorRole = selectedRole ? false : true;
    errorCategory = selectedCategory ? false : true;
    this.setState({errorRole, errorCategory});
    const { fields, user } = this.props; 

    if (this.props.valid && !errorRole && !errorCategory){
      let data = {
        "_id": user.currentUser._id,
        "username": fields.username,
        "email": fields.email,
        "confirmed": false,
        "blocked": false,
        "role": selectedRole._id,
        "fullname": fields.fullname,
        "categories": _.map(selectedCategory, '_id'),
        "primary_category": primary_category._id,
        "can_publish": can_publish,
        "can_pr": can_pr,
        "can_view_royalties": can_view_royalties,
        "can_set_royalties":can_set_royalties, 
        "can_read_other":can_read_other, 
        "can_edit_other":can_edit_other, 
        "can_edit_publish":can_edit_publish, 
        "can_takedown":can_takedown, 
        "can_trash":can_trash, 
        "can_view_ga": can_view_ga,
        "can_homepage": can_homepage,
        "no_banword": no_banword,
        "blocked": blocked,
        "can_live": can_live,
        "contentpennames": _.map(user.currentUser.contentpennames, '_id'),
        "royalties_editors": _.map(user.currentUser.royalties_editors, '_id')
      }
  
      if(fields.password){
        data.password = fields.password;
      }
      // console.log(data);
      
      this.props.updateUser(data);
    }
    
  }

  getValueRole = (value) => {
    // console.log(value);
    this.setState({selectedRole: value})
  };


  changecategory = (data) => {
    this.setState({selectedCategory: data})
  }

  selectprimary = (data) => {
    this.setState({primary_category: data})
  }


  render() { 
    let disableButtonSaveStyle = { cursor: 'pointer' };
    const { valid, pristine } = this.props;
    const {can_publish, can_pr,can_view_royalties,can_set_royalties, can_homepage,selectedRole, listRoles, contentpennames, royalties_editors,
      can_read_other, can_edit_other, can_edit_publish, can_takedown, can_trash, primary_category, selectedCategory, can_view_ga, no_banword, can_live, blocked} = this.state
    
    if (!valid || pristine || !primary_category || !selectedCategory || selectedCategory.length == 0) {
      disableButtonSaveStyle.opacity = 0.5;
      disableButtonSaveStyle.pointerEvents = 'none';
    }
    
    // console.log('can_publish',can_publish);
    const _user = localStorage.get('_user');
    return (   
      _user.role.name == "SuperAdmin" ? 
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Tài khoản</h1>
              </div>
        
            </div>
          </div>
        </div>
        <section className="content create-content">
          <div className="container-fluid">
            <div className="card card-primary card-outline">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-edit"></i>&nbsp; Sửa tài khoản
                </h3>
                <div className="card-tools">
                    <button className="btn btn-success btn-sm btn-flat" onClick={() => this.handleUpdateUser()}  style={disableButtonSaveStyle}>
                      <i className="fas fa-save fa-lg mr-2"></i> Lưu tài khoản<table></table>             
                    </button>
                </div>                
              </div>
              <div className="card-body">
                  <div className="row">
                    <div className="form-group col-6 mb-3">
                      <Field classgroup="form-group" classappend="fas fa-user" idinput="username"
                            name="username" type="text" component={renderFormFieldAppend} label="Tên đăng nhập" />
                    </div>
                    <div className="form-group col-6 mb-3">
                      <Field classgroup="form-group" classappend="fas fa-lock" idinput="password"
                          name="password" type="password" component={renderFormFieldAppend} label="Mật khẩu" />
                    </div>  
                   
                  </div>
                  <div className="row">
                    <div className="form-group col-6 mb-3">
                      <Field classgroup="form-group" classappend="fas fa-envelope" idinput="email"
                        name="email" type="text" component={renderFormFieldAppend} label="Email" />
                    </div>
                    <div className="form-group col-6 mb-3">
                      <Field classgroup="form-group" classappend="fas fa-user" idinput="fullname"
                        name="fullname" type="text" component={renderFormFieldAppend} label="Họ tên" />
                    </div>                  
                 
                 
                  </div>
                  <div className="row">
                    <div className="form-group col-6 mb-3">
                      { contentpennames && 
                    <CreatorItem creatable={true} functioncreate="createPennames" functioncall="getPennames" newapi="/contentpennames" valueinstore="listPenname" posttype="contentpennames"
                  type="penname" selectedValue={contentpennames} isClearable={true} label="Bút danh" placeholder="Chọn bút danh" ismulti={true} />
}
                      </div>   
                      <div className="form-group col-6 mb-3">
                        {royalties_editors && 
                      <CreatorItem creatable={true} functioncreate="createEditorV" functioncall="getRoyaltiesEditor" newapi="/royalties-editors" valueinstore="listRoyaltiesEditor" posttype="royalties_editors"
                        type="royalties_editor" selectedValue={royalties_editors} label="Biên tập viên" placeholder="Biên tập viên" ismulti={true} />
                      }
                        </div>  
                
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      
                        <label>Chức vụ</label>
                        <Select value={selectedRole} options={listRoles} onChange={this.getValueRole} placeholder="Chọn chức vụ" />
                      {this.state.errorRole && <span className="error-select">This field is required</span>} 
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Duyệt bài viết </label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_publish} onChange={(check) => {this.setState({ can_publish: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Đăng lên trang chủ</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_homepage} onChange={(check) => {this.setState({ can_homepage: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Viết bài PR</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_pr} onChange={(check) => {this.setState({ can_pr: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Xem nhuận bút</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_view_royalties} onChange={(check) => {this.setState({ can_view_royalties: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Chấm nhuận</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_set_royalties} onChange={(check) => {this.setState({ can_set_royalties: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Xem bài khác</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_read_other} onChange={(check) => {this.setState({ can_read_other: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Sửa bài khác</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_edit_other} onChange={(check) => {this.setState({ can_edit_other: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Sửa bài đã xuất bản</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_edit_publish} onChange={(check) => {this.setState({ can_edit_publish: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Trả bài viết</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_takedown} onChange={(check) => {this.setState({ can_takedown: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Bỏ rác</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_trash} onChange={(check) => {this.setState({ can_trash: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Xem GA</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_view_ga} onChange={(check) => {this.setState({ can_view_ga: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Bỏ qua lọc từ nhạy cảm</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={no_banword} onChange={(check) => {this.setState({ no_banword: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Khóa tài khoản</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={blocked} onChange={(check) => {this.setState({ blocked: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-6">
                          <label>Viết bài live</label>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                            <BootstrapSwitchButton checked={can_live} onChange={(check) => {this.setState({ can_live: check }) }}
                            onstyle="success" offstyle="danger" size="sm" onlabel='Bật' offlabel='Tắt' width="80" />
                          </div>
                        </div>
                      </div>
                   
                   
                    </div>  
                    <div className="col-6 mb-3">
                      <label>Danh mục</label>
                      {this.state.selectedCategory &&  <UserCategory usercategories={this.state.selectedCategory} primary_category={primary_category} changecategory={this.changecategory}  onselectprimary={this.selectprimary} />}
                    </div>
                    
                  </div>
                </div>
              </div>
          </div>
        </section>
      </div>
      
       : ''
    );
  }
  
};

const selector = formValueSelector('formUserEdit');

UserEdit = reduxForm({
  form: 'formUserEdit',
  validate
})(UserEdit)

export default connect( store => {
  return {
      user: store.user,
      config: store.config,
      form: store.formUserCreate,
      fields: selector(store, 'username', 'email', 'password', 'fullname')  
    };
  } , dispatch => {
  return {
    updateUser: (value) => { dispatch(userActions.updateUser(value))},    
    getUserById: (value) => { dispatch(userActions.getUserById(value))},    
    changeFieldValue: (field, value) => { dispatch(change('formUserEdit', field, value))}, 
  }
})(UserEdit)
