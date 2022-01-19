import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/action/user'
import queryString from 'query-string'
import Link from 'src/components/link'
import UserItem from 'src/page/users/item'
import Select from 'react-select'
import * as _ from 'lodash'
import Input from "../../components/input/Input";
import localStorage from '../../utils/local-storage'
import Pagination from "react-js-pagination"
import ApiService from "../../services/ApiService";
import { filtersToUlr, buildCategoryDropDown } from "../../utils/post-filter";
class UserList extends Component{

  constructor() {
    super();
    this.state = {
      listUser: null,
      filters: {        
        search: {
          fieldName: "_q",
          value: ""
        },
        role_in: {
          fieldName: "role_in",
          value: ""
        },
        search: {
          fieldName: "username_contains",
          value: ""
        },
        // page: {
        //   fieldName: "_start",
        //   value: "1"
        // },
        // limit: {
        //   fieldName: "_limit",
        //   value: "-1"
        // }
      },
      totalItemCount: 0
    };

  }
  componentDidMount (){
    const { router } = this.props
    let search = router.location.search;
    let filters = this.getFiltersFromQuery(router.location.query);

    // ApiService.get("/users/count?_limit=10&_sort=id:ASC&_start=20").then(result => {
      
    //   console.log("import result: ", result);
    // });
    
    this.props.getListUser(filters);
  }


  getFiltersFromQuery(query) {
    let filtersQuery = {};
    let { filters } = this.state;

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        if (value && value != "") {
          filtersQuery[key] = {
            ...this.state.filters[key],
            value: value
          };
        }
      }
    }
    filters = _.merge(filters, filtersQuery);
    this.setState({ filters });
    return filters;
  }

  handlePageChange = (pageNumber) => {
    this.addFilter('page', pageNumber);
  }
  addFilter(filter, value, execute = true) {
    let filters = this.resetFilters(filter);
    filters[filter].value = value;
    this.setState(
      {
        filters: filters
      },
      () => {
        // update filter and execute immediately
        if (execute) {
          let queryString = filtersToUlr(this.state.filters);

          if (queryString != "") {
            queryString = queryString.substr(1, queryString.length - 1);
            this.props.history.push(`/users?${queryString}`);
          } else {
            this.props.history.push(`/users`);
          }
          this.props.getListUser(this.state.filters);
        }

      }
    );
  }
  resetFilters(filter) {
    let { filters } = this.state;
    if (filter == "search") {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          filters[key].value = "";
        }
      }
    } else {
      // filters.page.value = 1;
      filters.search.value = "";
    }

    return filters;
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { router } = this.props
    const { listUser } = nextProps.user
    const { config: { listRole } } = nextProps
    let query = router.location.query;
    
    _.forEach(listRole, (role) => {
      if(role._id == query.role_in){
        role.isFixed = true
      }
    });  

    _.remove(listUser, (user) => { return user._id == localStorage.get('_user')._id });
    this.setState({listUser, listRole})  
  }

  selectedFilterRole = (value) => {
    if(value){
      const filterRole = 'role_in='+value._id;
      this.addFilter("role_in", value._id);

    }else{
      
      this.props.history.push(`/users`);
      this.props.getListUser('');
    }
  };

  searchUser = (value) => {
    console.log("value", value);
    
    if(value && value.length > 0){
      this.addFilter("search", value);
    }else{
      let {filters} = this.state;
      let data = this.resetFilters(filters);
      console.log(data);
      
      this.props.getListUser(data);
    }
  }


    
  render() {
    const _user = localStorage.get('_user');
      return (
        
        _user.role.name == "SuperAdmin" ? 
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Tài khoản <Link to={'/users/new'}><button type="button" className="btn btn-sm bg-green"><i className="fas fa-plus"></i> Thêm tài khoản</button></Link></h1>
                </div>
              </div>
            </div>
          </section>
          <section className="content">
          <div className="container-fluid">
            
              <div className="row">
                <div className="col-12">
                    <div className="card card-default color-palette-box">
                      <div className="card-header row">
                          <div className="col-sm-2">
                            <Select options={this.state.listRole} onChange={this.selectedFilterRole} isClearable={true} placeholder="Chức vụ" />                   
                          </div>
                          <div className="col-12 col-md-2 my-1 my-md-0 ml-auto px-3 px-md-2">
                          <Input
                            icon="search"
                            placeholder="Tìm kiếm"
                            value={this.state.filters.search.value}
                            onSubmit={value => {
                              this.searchUser(value);
                            }}
                          />
                        </div>
                        <div className="card-tools">
                        </div>
                      </div>
                      <div className="card-body table-responsive p-0">
              
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              {/* <th></th> */}
                              <th>Avatar</th>
                              <th>Username</th>
                              <th>Email</th>                    
                              <th>Chức vụ</th>                      
                              <th>Danh mục</th>                      
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                          this.state.listUser && this.state.listUser.map((item, idx) => {
                            return (
                              <UserItem item={item} key={`user-${idx}`} />                     
                            )
                          })
                          }                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
              </div>

              {/* {(this.state.totalItemCount && this.state.totalItemCount > 0) &&
                <div className="row">
                  <div className="col-sm-12 col-md-7">
                    <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                      <Pagination
                        activePage={parseInt(this.state.filters.page.value)}
                        itemsCountPerPage={parseInt(this.state.filters.limit.value)}
                        totalItemsCount={parseInt(this.state.totalItemCount)}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass="paginate_button page-item"
                        activeClass="active"
                        disabledClass="disabled"
                        itemClassPrev="previous"
                        itemClassNext="next"
                        linkClass="page-link"
                        hideFirstLastPages={true}
                        prevPageText="Previous"
                        nextPageText="Next"
                      />
                    </div>
                  </div>
                </div> }
                */}
              
          </div>
          </section>
      </div>
      :<p>...</p>

          
        )
    }
  
};

export default connect( store => {
  return {
      login: store.loginInfo,
      post: store.post,
      user: store.user,
      config: store.config,
      router: store.router,
    };
  } , dispatch => {
  return {
    getListUser: (value) => { dispatch(userActions.getListUser(value))}  
  }
})(UserList)

