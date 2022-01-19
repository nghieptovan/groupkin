import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/action/user'
import * as configActions from '../../store/action/config'
import Pagination from "react-js-pagination"
import queryString from 'query-string'
import Link from 'src/components/link'
import ContentItem from './item'
import Select from 'react-select'
import * as _ from 'lodash'
import { filtersToUlr } from "../../utils/post-filter";
import AddItem from './item.add';
import ApiService from "../../services/ApiService";
import localStore from "src/utils/local-storage";
class ConfigList extends Component{

  constructor() {
    super();
    this.state = {
      listConfiguration: null,
      addedContent: null,
      filters: {        
        search: {
          fieldName: "_q",
          value: ""
        },
        page: {
          fieldName: "_start",
          value: "1"
        },
        limit: {
          fieldName: "_limit",
          value: "10"
        },
        start_date: {
          fieldName: "createdAt_gte",
          value: ""
        },
        end_date: {
          fieldName: "createdAt_lte",
          value: ""
        },
        label: {
          fieldName: "slug_contains",
          value: ""
        }
      },
      totalItemCount: 0,
      itemAdd : {
        active: true,
        label: "",
        slug: ""
      },
      showModal: false,
      endpoint: 'contentpennames',
      type: 'Bút Danh'
    };
  }
  componentDidMount(){
    const { config, router } = this.props; 
    let { listConfiguration } = this.state;   
    ApiService.get(`/configurations`).then(result => {
      listConfiguration = result;
      this.setState({listConfiguration});
    });
    if (localStore.get("_user").role.name != "SuperAdmin") {
      this.confirmAction();
    }
   }

   confirmAction() {
    const options = {
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => (
        <div className="custom-ui-alert">
          <h1>Bạn không có quyền truy cập mục này.</h1>
          <div
            className="bg-c7c6c5 bg-c7c6c5 txt-center pt-3 pb-3"
            onClick={() => {
              onClose();
              window.location.href = "/";
            }}
          >
            Trở lại
          </div>
        </div>
      ),
      closeOnEscape: false,
      closeOnClickOutside: false
    };

    confirmAlert(options);
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
            this.props.history.push(`/content/pennames?${queryString}`);
          } else {
            this.props.history.push(`/content/pennames`);
          }
          this.props.getPennames(filters);
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
      filters.page.value = 1;
      filters.limit.value = 10;
      filters.search.value = "";
    }
    this.setState({listPennames: [],addedContent: null });
    return filters;
  }


  searchDataByLabel = (data) => {
    
    this.addFilter('label', data);
  }

  addedData = data => {
    let { addedContent } = this.state;
    addedContent = data;
    this.setState({addedContent : addedContent}, () => {}); 
  }


  render() {
    
    const { listPennames } = this.state;
      return (
  
          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
               
              </div>
            </section>
            <section className="content">
            <div className="container-fluid">
               
                <div className="row">
                  <div className="col-12">
                      <div className="card card-default color-palette-box">
                       
                        {/* <AddItem endpoint={this.state.endpoint} type={this.state.type} getdata={this.searchDataByLabel} datasearch={this.state.filters.label.value} addeddata={this.addedData} /> */}
                        <div className="card-body table-responsive p-0">
                
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                {/* <th></th> */}
                                <th>Tên</th>                 
                                <th>Ghi chú</th>                 
                                <th>Ngày cập nhật</th>                                       
                                <th>Thao tác</th>
                              </tr>
                            </thead>
                            <tbody>
                           
                            {
                            this.state.listConfiguration && this.state.listConfiguration.map((item, idx) => {
                              return (
                                <ContentItem item={item} key={`user-${idx}`} type="Config" endpoint="configurations" />                     
                              )
                            })
                            }
                               {(this.state.listPennames && this.state.listPennames.length == 0) && <tr className="odd">
                              <td
                                valign="top"
                                colSpan="8"
                                className="dataTables_empty"
                              >
                                Chưa có bút danh nào
                            </td>
                            </tr>} 
                            
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                </div>
         
            </div>
            </section>
          </div>
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
    getListUser: (value) => { dispatch(userActions.getListUser(value))},
    getPennames: (value) => { dispatch(configActions.getPennames(value))},
  }
})(ConfigList)

