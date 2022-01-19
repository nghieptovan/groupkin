import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as authActions from '../../store/action/auth'
import * as configActions from '../../store/action/config'

import Link from 'src/components/link'
import {ItemMenu} from 'src/components/util/item-menu'
import localStore from 'src/utils/local-storage'

class SidebarComponent extends Component{
    constructor() {
      super();
      this.state = {
        user: {}        
      };
    }  

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentDidMount () {
      const { router } = this.props;      
      this.loadConfig();
      const _user = localStore.get('_user')
      if(!_user._id){
        window.location.href = '/login';
      }
      if(_user._id){
        this.setState({ user: _user, activeMenu: router.location.pathname });
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const _user = localStore.get('_user')
      if(!_user._id){
        window.location.href = '/login';
      }
      if(_user._id){
        this.setState({ user: _user });
      }
    }
    
    loadConfig(){
      let { config } = this.props;
      if(!config.listRoleRule) this.props.getListRoleRule();    
      if(!config.listCategory) this.props.getListCate();    
      if(!config.listTags) this.props.getListTag();    
      if(!config.listPenname) this.props.getListPenname();    
      if(!config.listPosttype) this.props.getListPosttype();   
      if(!config.listContentCreatorType) this.props.getListPosttype();   
      if(!config.listContentCreator) this.props.getContentCreator(); 
    }

    render(){
      let { user } = this.state;
      const itemSidebar = [
        {
          title: 'Dashboard',
          link: '/',
          classIcon: 'nav-icon fas fa-tachometer-alt',
          subItem: []
        },
        {
          title: 'Posts',
          link: '/posts',
          classIcon: 'nav-icon fas fa-copy',
          subItem: []
        },
        {
          title: 'Hình ảnh & Video',
          link: '/medias',
          classIcon: 'nav-icon fas fa-photo-video',
          subItem: []
        },
      ];
        return(
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
    
            <a href="index3.html" className="brand-link">
              <img src={process.env.PUBLIC_URL + '/img/icon.png'} alt="Saostar" 
              className="brand-image elevation-3" />
              <span className="brand-text font-weight-light">SaoStar CMS</span>
            </a>
        
            
            <div className="sidebar">
              
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          

                <div className="image">
                    <img className="img-circle img-bordered-sm" src={process.env.PUBLIC_URL + '/img/user7-128x128.jpg'} alt="User Image" />
                  </div>
          <div className="info">
        
                      <a href="#" className="d-block">{user && user.email}</a>
                   
                    {/* <span className="description">{user && user.role && user.role.description}</span> */}
          </div>
              </div>
        
              
              <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  {
                    itemSidebar && itemSidebar.map((item, idx) => 
                    <ItemMenu key={`item-menu-${idx}`} item={item} activemenu={this.state.activeMenu} />
                   )
                  }

                  {
                  ( user && user.role && user.role.name === 'SuperAdmin') && 
                  <>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-user"></i>
                      <p>
                        Users
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                       <Link to={'/uses'} className="nav-link">
                          <i className="fa fa-list nav-icon"></i>
                          <p>List</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                      <Link to={'/users/new'} className="nav-link">
                          <i className="fa fa-plus nav-icon"></i>
                          <p>Create</p>
                        </Link>
                      </li>
                     
                    </ul>
                  </li>
                  
                 
                  
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-chart-pie"></i>
                      <p>
                        Charts
                        <i className="right fas fa-angle-left"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="pages/charts/chartjs.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>ChartJS</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/charts/flot.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Flot</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/charts/inline.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Inline</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-tree"></i>
                      <p>
                        UI Elements
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="pages/UI/general.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>General</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/UI/icons.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Icons</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/UI/buttons.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Buttons</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/UI/sliders.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Sliders</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/UI/modals.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Modals & Alerts</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/UI/navbar.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Navbar & Tabs</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/UI/timeline.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Timeline</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/UI/ribbons.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Ribbons</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-edit"></i>
                      <p>
                        Forms
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="pages/forms/general.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>General Elements</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/forms/advanced.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Advanced Elements</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/forms/editors.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Editors</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/forms/validation.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Validation</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-table"></i>
                      <p>
                        Tables
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="pages/tables/simple.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Simple Tables</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/tables/data.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>DataTables</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/tables/jsgrid.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>jsGrid</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-header">EXAMPLES</li>
                  <li className="nav-item">
                    <a href="pages/calendar.html" className="nav-link">
                      <i className="nav-icon far fa-calendar-alt"></i>
                      <p>
                        Calendar
                        <span className="badge badge-info right">2</span>
                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/gallery.html" className="nav-link">
                      <i className="nav-icon far fa-image"></i>
                      <p>
                        Gallery
                      </p>
                    </a>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-envelope"></i>
                      <p>
                        Mailbox
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="pages/mailbox/mailbox.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Inbox</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/mailbox/compose.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Compose</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/mailbox/read-mail.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Read</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-book"></i>
                      <p>
                        Pages
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="pages/examples/invoice.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Invoice</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/profile.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Profile</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/e_commerce.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>E-commerce</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/projects.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Projects</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/project_add.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Project Add</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/project_edit.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Project Edit</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/project_detail.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Project Detail</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/contacts.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Contacts</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-plus-square"></i>
                      <p>
                        Extras
                        <i className="fas fa-angle-left right"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="pages/examples/login.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Login</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/register.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Register</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/forgot-password.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Forgot Password</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/recover-password.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Recover Password</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/lockscreen.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Lockscreen</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/legacy-user-menu.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Legacy User Menu</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/language-menu.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Language Menu</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/404.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Error 404</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/500.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Error 500</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/pace.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Pace</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/examples/blank.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Blank Page</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="starter.html" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Starter Page</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-header">MISCELLANEOUS</li>
                  <li className="nav-item">
                    <a href="https://adminlte.io/docs/3.0" className="nav-link">
                      <i className="nav-icon fas fa-file"></i>
                      <p>Documentation</p>
                    </a>
                  </li>
                  <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="fas fa-circle nav-icon"></i>
                      <p>Level 1</p>
                    </a>
                  </li>
                  <li className="nav-item has-treeview">
                    <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-circle"></i>
                      <p>
                        Level 1
                        <i className="right fas fa-angle-left"></i>
                      </p>
                    </a>
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Level 2</p>
                        </a>
                      </li>
                      <li className="nav-item has-treeview">
                        <a href="#" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>
                            Level 2
                            <i className="right fas fa-angle-left"></i>
                          </p>
                        </a>
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              <i className="far fa-dot-circle nav-icon"></i>
                              <p>Level 3</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              <i className="far fa-dot-circle nav-icon"></i>
                              <p>Level 3</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="#" className="nav-link">
                              <i className="far fa-dot-circle nav-icon"></i>
                              <p>Level 3</p>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">
                          <i className="far fa-circle nav-icon"></i>
                          <p>Level 2</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="fas fa-circle nav-icon"></i>
                      <p>Level 1</p>
                    </a>
                  </li>
                  <li className="nav-header">LABELS</li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-circle text-danger"></i>
                      <p className="text">Important</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-circle text-warning"></i>
                      <p>Warning</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon far fa-circle text-info"></i>
                      <p>Informational</p>
                    </a>
                  </li>
                  </>
                   }
                </ul>
              </nav>
              
            </div>
            
          </aside>
        );
    }


}
export default connect( store => {
  return {
      login: store.loginInfo,
      config: store.config,
      router: store.router,
    };
  } , dispatch => {
  return {
    logoutPage: (value) => { dispatch(authActions.logout(value))},
    getListRoleRule: (value) => { dispatch(configActions.getListRoleRule(value))},
    getListCate: (value) => { dispatch(configActions.getListCate(value))},
    getListTag: (value) => { dispatch(configActions.getListTag(value))},
    getListPenname: (value) => { dispatch(configActions.getListPenname(value))},
    getListPosttype: (value) => { dispatch(configActions.getListPosttype(value))},
    getContentCreator: (value) => { dispatch(configActions.getContentCreator(value))},
  }
})(SidebarComponent)




