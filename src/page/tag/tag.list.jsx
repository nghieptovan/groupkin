import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as configActions from '../../store/action/config'
import queryString from 'query-string'
import Link from 'src/components/link'
import TagItem from '../../components/tag/item'
import Select from 'react-select'
import * as _ from 'lodash'
import AddItem from '../../components/tag/item.add'
import slug from 'slug'
import { filtersToUlr } from "../../utils/post-filter";
import Pagination from "react-js-pagination"
import ApiService from "../../services/ApiService";
class TagList extends Component{

  constructor() {
    super();
    this.state = {
      listCategory: null,
      addedContent: null,
      filters: {        
        page: {
          fieldName: "_start",
          value: "1"
        },
        limit: {
          fieldName: "_limit",
          value: "20"
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
      endpoint: 'tags',
      type: 'Tag',
      originalCat: [],
      listTagsCount: -1
      
    };
  }

  componentDidMount(){
    const { config, router } = this.props;    
    let filters = this.getFiltersFromQuery(router.location.query);
    this.props.getListTag(filters);     
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
    const { config: { listTags } } = this.props;
    const { config: { listTags : nlistTags } } = nextProps;
    if(nlistTags != listTags){
      this.getData(nextProps);  
    }      
   }
 
   getData(props){
     const { config: { listTags, listTagsCount } } = props;
     this.setState({listTagsCount, listTags});
   }

  searchDataByLabel = (data) => {
    this.addFilter('label', data);
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
            this.props.history.push(`/tags?${queryString}`);
          } else {
            this.props.history.push(`/tags`);
          }

          this.props.getListTag(filters);
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
      filters.limit.value = 20;
    }
    this.setState({listTags: [], addedContent: null });
    return filters;
  }

  render() {
    const { listTags, originalCat } = this.state;
      return (  
          <div className="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Danh mục                      
                    </h1>
                  </div>
                </div>
              </div>
            </section>

            <section className="content">
            <div className="container-fluid">               
                <div className="row">
                  <div className="col-12">
                      <div className="card card-default color-palette-box">
                       { listTags &&
                        <AddItem endpoint={this.state.endpoint} type={this.state.type} 
                        getdata={this.searchDataByLabel} datacategory={originalCat} datasearch={this.state.filters.label.value} addeddata={this.addedData} />
                          }
                        <div className="card-body table-responsive p-0">
                
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Tag</th>
                                <th>Slug</th>
                                <th>Trạng thái</th>                    
                                <th>Thao tác</th>
                              </tr>
                            </thead>
                            <tbody>
                            { 
                              this.state.listTags && this.state.listTags.map((item_0, idx_0) => {
                              return <TagItem endpoint="/tags" level="0" item={item_0} key={`tags-${idx_0}`} /> 
                              })
                            }
                              
                            
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                </div>
                
                {(this.state.listTagsCount && this.state.listTagsCount > 0) &&
                  <div className="row">
                    <div className="col-sm-12 col-md-7">
                      <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                        <Pagination
                          activePage={parseInt(this.state.filters.page.value)}
                          itemsCountPerPage={parseInt(this.state.filters.limit.value)}
                          totalItemsCount={parseInt(this.state.listTagsCount)}
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
    getListTag: (value) => { dispatch(configActions.getListTagManager(value))}
  }
})(TagList)

