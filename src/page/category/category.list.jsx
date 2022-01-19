import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/action/user'
import queryString from 'query-string'
import Link from 'src/components/link'
import CategoryItem from '../../components/category/item'
import Select from 'react-select'
import * as _ from 'lodash'
import AddItem from '../../components/category/item.add'
import slug from 'slug'
class CategoryList extends Component{

  constructor() {
    super();
    this.state = {
      listCategory: null,
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
      endpoint: 'categories',
      type: 'Danh mục',
      originalCat: []
      
    };
  }

  componentDidMount(){
    this.getData();    
   }
 
 
   UNSAFE_componentWillReceiveProps(nextProps){
     this.getData(nextProps);    
   }
 
   getData(props){
     const { config: { listCategory } } = props || this.props;
     if(listCategory && listCategory.length > 0){
       this.setState({listCategory: listCategory, originalCat: listCategory})  
     }   
   }

  searchDataByLabel = (keyword) => {
    let tmpCat = [];
    if(keyword.length == 0){
      tmpCat = this.state.originalCat;
    }else{
        _.forEach(this.state.originalCat, (cat) => {

            if(cat.url.includes(slug(keyword))){
                tmpCat.push(cat);
            }
            
            if (cat.categories) {
                // check level 1 => add to selected category level 1
                _.forEach(cat.categories, (cat1) => {
                    if(cat1.url.includes(slug(keyword))){
                        tmpCat.push(cat);
                    }
                    if (cat1.categories) {
                        // check level 2 => add to selected category level 2
                        _.forEach(cat1.categories, (cat2) => {
                            if(cat2.url.includes(slug(keyword))){
                                tmpCat.push(cat);
                            }
                        })
                    }
                })
            }

        })
    }
    this.setState({listCategory: tmpCat, value: keyword});
  }

  render() {
    const { listCategory, originalCat } = this.state;
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
                       { listCategory &&
                        <AddItem endpoint={this.state.endpoint} type={this.state.type} 
                        getdata={this.searchDataByLabel} datacategory={originalCat} datasearch={this.state.filters.label.value} addeddata={this.addedData} />
                          }
                        <div className="card-body table-responsive p-0">
                
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                {/* <th></th> */}
                                <th>Tên danh mục</th>
                                <th>Url</th>
                                <th>Trạng thái</th>                    
                                <th>Thao tác</th>
                              </tr>
                            </thead>
                            <tbody>
                            { listCategory && listCategory.map((item_0, idx_0) => {
                    
                              return (
                                <>
                                <CategoryItem endpoint="/categories" level="0" item={item_0} key={`category-${idx_0}`} />  
                                  { item_0.categories &&  item_0.categories[0] && item_0.categories.map((item_1, idx_1) => {
                                  return (
                                      <>
                                      <CategoryItem endpoint="/categories" level="1" parent={item_0} item={item_1} key={`category-sub1-${idx_1}`} /> 
                                      { item_1.categories && item_1.categories[0] && item_1.categories.map((item_2, idx_2) => {
                                        return (
                                          <CategoryItem endpoint="/categories" level="2" parent={item_1} item={item_2} key={`category-sub2-${idx_2}`} />
                                          )
                                        })
                                        }
                                      </> 
                                    )
                                  })
                                  }
                                </>              
                              )
                            })
                            }
                              
                            
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
    getListUser: (value) => { dispatch(userActions.getListUser(value))}  
  }
})(CategoryList)

