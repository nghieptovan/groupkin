import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/action/user'
import * as configActions from '../../store/action/config'
import Pagination from "react-js-pagination"
import queryString from 'query-string'
import Link from 'src/components/link'
import ContentItem from '../../page/content/item'
import Select from 'react-select'
import * as _ from 'lodash'
import { filtersToUlr } from "../../utils/post-filter";
import AddItem from './item.add';
class PhotographerList extends Component{

  constructor() {
    super();
    this.state = {
      listPhotographers: null,
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
          fieldName: "label_contains",
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
      endpoint: 'contentphotos',
      type: 'Photographer'
    };
  }
  componentDidMount(){
    const { config, router } = this.props;    
    let filters = this.getFiltersFromQuery(router.location.query);
    this.props.getPhotographers(filters);
    // this.getData();    
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
 
 
   UNSAFE_componentWillReceiveProps(nextProps){
    const { config: { listPhoto : nlistPhoto } } = nextProps;
    const { config: { listPhoto } } = this.props;
    if(nlistPhoto != listPhoto){
      this.getData(nextProps);    
    }
     
   }
 
   getData(props){
     const { config: { listPhoto, countData } } = props;
     console.log(listPhoto);
     
     this.setState({listPhotographers: listPhoto, totalItemCount: countData });
   }
  handlePageChange = (pageNumber) => {
    this.setState({listPhotographers: [] });
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
            this.props.history.push(`/content/photographer?${queryString}`);
          } else {
            this.props.history.push(`/content/photographer`);
          }
          this.props.getPhotographers(this.state.filters);
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
      filters.search.value = "";
    }

    return filters;
  }
  searchDataByLabel = (data) => {
    this.setState({listPhotographers: [] });
    this.addFilter('label', data);
  }

  addedData = data => {
    let { listPhotographers } = this.state;
    listPhotographers.unshift(data);

    this.setState({listPhotographers : listPhotographers}, () => {}); 
  }

  render() {
    
    const { listPhotographers } = this.state
      return (
  
          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                
                </div>
              </div>
            </section>
            <section className="content">
            <div className="container-fluid">
               
                <div className="row">
                  <div className="col-12">
                      <div className="card card-default color-palette-box">
                      <AddItem endpoint={this.state.endpoint} type={this.state.type} getdata={this.searchDataByLabel} datasearch={this.state.filters.label.value} addeddata={this.addedData} />
                        <div className="card-body table-responsive p-0">
                
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                {/* <th></th> */}
                                <th>Tên</th>
                                <th>Slug</th>                    
                                <th>Ngày cập nhật</th>                      
                                <th>Loại</th>                      
                                <th>Thao tác</th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.listPhotographers && this.state.listPhotographers.map((item, idx) => {
                              return (
                                <ContentItem item={item} key={`user-${idx}`} type="Photograher" endpoint="contentphotos" />                     
                              )
                            })
                            }
                              
                            
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                </div>
            
                {(this.state.totalItemCount && this.state.totalItemCount.photo > 0) &&
                  <div className="row">
                    <div className="col-sm-12 col-md-7">
                      <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                        <Pagination
                          activePage={parseInt(this.state.filters.page.value)}
                          itemsCountPerPage={parseInt(this.state.filters.limit.value)}
                          totalItemsCount={parseInt(this.state.totalItemCount.photo)}
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
                  </div>
                }
            </div>
            </section>
          </div>
        )
    }
  
};

export default connect( store => {
  return {
      config: store.config,
      router: store.router,
    };
  } , dispatch => {
  return {
    getPhotographers: (value) => { dispatch(configActions.getPhotographers(value))},
  }
})(PhotographerList)

