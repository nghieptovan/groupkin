import React, {Component} from 'react'
import { connect } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import * as _ from 'lodash'
import { renderFormFieldAppend } from '../../utils/reduxField'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import { validateUpdateUserForm } from '../../utils/formValidation'
import Select from 'react-select'
import * as userActions from '../../store/action/user';
import * as fileActions from '../../store/action/file'
import localStorage from '../../utils/local-storage'
import Uploader from '../../components/util/uploader';
import CreatorItem2 from './creator-item2';
const validate = values => {
  return validateUpdateUserForm(values, false);
};

class UserProfile extends Component{
  constructor() {
    super();    
    this.state = {
      listRoles: null,
      listCategory: null,
      selectedRole: null, selectedCategory: null,
      errorRole: false, errorCategory: false,
      valueRole: null, valueCategory: null, user: null,
      crop_profile: {
        unit: '%',
        width: 50,
        aspect: 1.01,
        x: 0,
        y: 0,
      },
      uploadAvatar: false,
      contentpennames: null, royalties_editors: null
    }
   }

   componentDidMount() {
    this.props.getMyProfile();
   }

   UNSAFE_componentWillReceiveProps(nextProps){
      const { user: nextUser, fileUpload: nextUpload, config: nextConfig, fields: nextFields} = nextProps;
      const { user, fileUpload, fields, config } = this.props;

      if(user.getProfileStatus !== nextUser.getProfileStatus){
        if( nextUser.getProfileStatus === 2){
          this.setDataForm(nextUser.myProfile);
        }
        if(nextUser.getProfileStatus === 3){
          toast.error("User not found!!");
          this.props.history.push('/users');
        }
      }
      if(user.updateUserStatus !== nextUser.updateUserStatus && nextUser.updateUserStatus === 2){
        toast.success("Updated Profile Successfully!");
        if(!this.state.uploadAvatar)
          this.props.history.push('/users');        
      }
      if(user.updateUserStatus !== nextUser.updateUserStatus && nextUser.updateUserStatus === 3){
          toast.success("Update Profile Error!");
      }

      if (fileUpload.uploadStatus !== nextUpload.uploadStatus && nextUpload.uploadStatus === 2) {
        let myProfile = nextUser.myProfile;
        const fileUpload = nextUpload.fileUpload[0];
        if (fileUpload.name == 'avatar.jpeg') {
          toast.success("Upload successfully");
          myProfile.avatar = fileUpload;          
        }   
        this.setState({ uploadAvatar : true }, () => {
          setTimeout(() => {
            this.props.updateUser(myProfile);
          }, 2000);   
        })
       
      }

  }


  setDataForm(user){
    let _user = localStorage.get('_user');
    let { role, categories, username, password, email, fullname, contentpennames, royalties_editors } = _user;
    let cate = _user && _user.categories || [];
    let selectedCategory = _.map(cate, 'name').join(', ');    
    this.props.dispatch(change('formUserEdit', 'username', username));
    this.props.dispatch(change('formUserEdit', 'password', password));
    this.props.dispatch(change('formUserEdit', 'email', email));
    this.props.dispatch(change('formUserEdit', 'fullname', fullname));    
    console.log(_user);
    this.setState({selectedRole: role.name, selectedCategory, user, contentpennames: contentpennames, royalties_editors: royalties_editors});
  }

  handleUpdateUser() {
    let { selectedRole, selectedCategory, errorRole, errorCategory } = this.state;
    errorRole = selectedRole ? false : true;
    errorCategory = selectedCategory ? false : true;
    this.setState({errorRole, errorCategory});
    const { fields, user } = this.props; 

    if (this.props.valid){
      let data = {
        "_id": user.myProfile._id,
        "email": fields.email,
        "confirmed": false,
        "blocked": false,
        "fullname": fields.fullname,
        "contentpennames": _.map(user.myProfile.contentpennames, '_id'),
        "royalties_editors": _.map(user.myProfile.royalties_editors, '_id')
      }
      if(fields.password){
        data.password = fields.password;
      }
      console.log(data);
      this.props.updateUser(data);
    }    
  }

  getValueRole = (value) => {
    this.setState({selectedRole: value})
  };

  getValueCategory = (value) => {
    this.setState({selectedCategory: value})
  };

  handleImageCrop = data => {
    let fileName = 'avatar.jpeg';
    if (data.type == 'profile') {
      const blob = data.blob;
      fetch(blob).then(res => res.blob()).then(blob => {
        const fd = new FormData()
        const file = new File([blob], fileName);
        fd.append('files', file);
        this.props.uploadFile(fd);
      })


    }
  }

  render() { 
    let disableButtonSaveStyle = { cursor: 'pointer' };
    const { valid, pristine } = this.props;
    if (!valid || pristine) {
      disableButtonSaveStyle.opacity = 0.5;
      disableButtonSaveStyle.pointerEvents = 'none';
    }
    let avatar = "";
    if(this.state.user && this.state.user.avatar){
      avatar = this.state.user.avatar.hash + this.state.user.avatar.ext;
    }
    const { contentpennames, royalties_editors  } = this.state;
    
    return (   
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
                  <i className="fas fa-edit"></i>&nbsp; Tài khoản của tôi
                </h3>
                <div className="card-tools">
                    <button className="btn btn-success btn-sm btn-flat" onClick={() => this.handleUpdateUser()}  style={disableButtonSaveStyle}>
                      <i className="fas fa-save fa-lg mr-2"></i> Cập nhật<table></table>             
                    </button>
                </div>                
              </div>
              <div className="card-body">
                  <div className="row">
                    <div className="form-group col-6 mb-3">
                      <Field classgroup="form-group" classappend="fas fa-user" idinput="username"
                            name="username" type="text" component={renderFormFieldAppend} label="Tên đăng nhập" disabled={true} />
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
                      <label>Chức vụ:</label>

                      <div className="input-group my-colorpicker2 colorpicker-element" data-colorpicker-id="2">
                        <input type="text" defaultValue={this.state.selectedRole} className="form-control" disabled />

                        <div className="input-group-append">
                          <span className="input-group-text"><i className="fas fa-square"></i></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-6 mb-3">
                      <label>Danh mục:</label>
                      <div className="input-group my-colorpicker2 colorpicker-element" data-colorpicker-id="2">
                        <input type="text" defaultValue={this.state.selectedCategory} className="form-control" disabled />
                        <div className="input-group-append">
                          <span className="input-group-text"><i className="fas fa-square"></i></span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="form-group col-6 mb-3">
                      { contentpennames && 
                    <CreatorItem2 creatable={true} functioncreate="createPennames" functioncall="getPennames" newapi="/contentpennames" valueinstore="listPenname" posttype="contentpennames"
                  type="penname" selectedValue={contentpennames} isClearable={true} label="Bút danh" placeholder="Chọn bút danh" ismulti={true} />
}
                      </div>   
                      <div className="form-group col-6 mb-3">
                        {royalties_editors && 
                      <CreatorItem2 creatable={true} functioncreate="createEditorV" functioncall="getRoyaltiesEditor" newapi="/royalties-editors" valueinstore="listRoyaltiesEditor" posttype="royalties_editors"
                        type="royalties_editor" selectedValue={royalties_editors} label="Biên tập viên" placeholder="Biên tập viên" ismulti={true} />
                      }
                        </div>  
                
                  </div>
                  <div className="row">
                    <div className="form-group col-6 mb-3">
                    <label>Hình đại diện:</label>
                      <div style={{ width: "100%", margin: "0 auto", textAlign: 'center' }} >
                      {this.state.user && <Uploader tmp_id={this.state.user.id} url={avatar} circular={true} crop={this.state.crop_profile} type="profile" handleImageCrop={this.handleImageCrop} />}
                      </div>
                     
                    </div>
                      
                  </div>
                </div>
              </div>
          </div>
        </section>
      </div>
      
       
    );
  }
  
};

const selector = formValueSelector('formUserEdit');

UserProfile = reduxForm({
  form: 'formUserEdit',
  validate
})(UserProfile)

export default connect( store => {
  return {
      user: store.user,
      config: store.config,
      form: store.formUserCreate,
      fileUpload: store.fileUpload,
      fields: selector(store, 'username', 'email', 'password', 'fullname')  
    };
  } , dispatch => {
  return {
    updateUser: (value) => { dispatch(userActions.updateUser(value))},    
    updateMyProfile: (value) => { dispatch(userActions.updateMyProfile(value))},    
    getMyProfile: (value) => { dispatch(userActions.getMyProfile(value))},    
    changeFieldValue: (field, value) => { dispatch(change('formUserEdit', field, value))}, 
    uploadFile: (value) => { dispatch(fileActions.uploadFile(value)) },
  }
})(UserProfile)
