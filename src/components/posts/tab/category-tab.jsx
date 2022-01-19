import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MultiSelectReact from 'multi-select-react'
import localStorage from '../../../utils/local-storage'
import * as _ from 'lodash'
import Input from "../../../components/input/Input";
import slug from 'slug';
class CategoryTab extends Component {
    constructor() {
        super();
        this.state = {
            originalCat: [],
            category: [],
            selectCategory: [],
            primanryCategory: {},
            loadedData: false,
            value: ""
        }
    }
    componentDidMount() {
        this.getData();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    getData(props) {
        let { selectCategory, loadedData, primanryCategory, originalCat } = this.state;
        const user = localStorage.get('_user');
        const { post: { currentPost }, config: nextConfig } = props || this.props;
        let category = [];

        if (nextConfig.listCategory && nextConfig.listCategory.length > 0 && !loadedData) {

            let tempCategory = [];
            _.forEach(user.categories, (temp, idx) => {
                let tmp = _.find(nextConfig.listCategory, { "_id": temp._id })
                if (tmp) {
                    tempCategory.push(tmp);
                }
            });

            // initialize category

            
            if(currentPost.categories && currentPost.categories.length == 0){
                selectCategory.push(tempCategory[0]);
                
            }

            _.forEach(tempCategory, (cat) => {
                // add to selected category level 0
                if (_.some(currentPost.categories, { "_id": cat._id })) {
                    cat.selected = true;
                    selectCategory.push(cat);
                } else {
                    cat.selected = false;
                }
                if (cat.categories) {
                    // check level 1 => add to selected category level 1
                    _.forEach(cat.categories, (cat1) => {
                        if(cat1){
                            if (_.some(currentPost.categories, { "_id": cat1._id })) {
                                cat1.selected = true;
                                selectCategory.push(cat1);
                            } else {
                                cat1.selected = false;
                            }
                            if (cat1.categories) {
                                // check level 2 => add to selected category level 2
                                _.forEach(cat1.categories, (cat2) => {
                                    if (_.some(currentPost.categories, { "_id": cat2._id })) {
                                        cat2.selected = true;
                                        selectCategory.push(cat2);
                                    } else {
                                        cat2.selected = false;
                                    }
                                })
                            }
                        }
                    })
                }
            })

           
            
            category = tempCategory
            category = _.sortBy(category, [function(o) { return !o.selected; }]);
            // check primary, not exits => category 0 == primary
            _.forEach(category, (cat) => {
                if (currentPost.primary_category && currentPost.primary_category._id == cat._id) {
                    cat.primary = true
                    // primanryCategory = cat
                } else {
                    cat.primary = false
                }
            })

            category = _.sortBy(category, [function(o) { return !o.primary; }]);

            originalCat = category;

            this.setState({ originalCat, category, selectCategory, loadedData: true, primanryCategory }, () => {
                currentPost.categories =  _.unionBy(selectCategory, '_id');
                currentPost.primary = primanryCategory;
                this.props.setCurrentPost(currentPost);
            });
        }
    }



    selectCategory = (e) => {

        const { post: { currentPost } } = this.props
        let { category, selectCategory } = this.state;
        _.map(category, (cat_0) => {
            if (cat_0._id === e.target.value) {
                cat_0.selected = !cat_0.selected
            }
            _.map(cat_0.categories, (cat_1) => {
                if (!cat_0.selected) {
                    cat_1.selected = false;
                }
                if (cat_1._id === e.target.value) {
                    cat_1.selected = !cat_1.selected
                    if (cat_1.selected) {
                        cat_0.selected = true
                    }
                }
                _.map(cat_1.categories, (cat_2) => {
                    if (!cat_1.selected) {
                        cat_2.selected = false;
                    }
                    if (cat_2._id === e.target.value) {
                        cat_2.selected = !cat_2.selected
                        if (cat_2.selected) {
                            cat_1.selected = true
                            cat_0.selected = true
                        }
                    }
                })
            })

        })


        _.forEach(category, (cat_0) => {
            if (cat_0.selected) {
                selectCategory.push(cat_0)
            } else {
                _.remove(selectCategory, (cate) => { return cate._id == cat_0._id });
            }
            _.forEach(cat_0.categories, (cat_1) => {
                if (cat_1.selected) {
                    selectCategory.push(cat_1)
                } else {
                    _.remove(selectCategory, (cate) => { return cate._id == cat_1._id });
                }
                _.forEach(cat_1.categories, (cat_2) => {
                    if (cat_2.selected) {
                        selectCategory.push(cat_2)
                    } else {
                        _.remove(selectCategory, (cate) => { return cate._id == cat_2._id });
                    }
                })
            })
        })
        selectCategory = _.unionBy(selectCategory, '_id');


        this.setState({ category, selectCategory }, () => {
            currentPost.categories = selectCategory;
            this.props.setCurrentPost(currentPost);
        });

    }

    makePrimary(cate) {
        let { category } = this.state;
        const { post: { currentPost } } = this.props;
        currentPost.primary_category = cate;
        _.map(category, (cat) => {
            cat.primary = (currentPost.primary_category && currentPost.primary_category._id == cat._id) ? true : false;
        })
        this.setState({ category }, () => {
            this.props.setCurrentPost(currentPost);
        });
    }

    setValueTitle(value){
        if(value == ""){
            this.searchPosts("");
        }
    }
    searchPosts(keyword) {
        // console.log(keyword);
        // console.log(this.state.originalCat);
        // let tmpCat = _.filter(this.state.originalCat, (cat) => {
        //     return cat.url.includes(slug(keyword));
        // })
        
        let tmpCat = [];
        
        if(keyword.length == 0){
            tmpCat = this.state.originalCat;
        }else{
            _.forEach(this.state.originalCat, (cat) => {

                // add to selected category level 0
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

        
       
        // console.log(tmpCat);
        this.setState({category: tmpCat, value: keyword});
        // this.setState({ posts: [] });
        // this.addFilter("search", keyword);
      }

    render() {
        const { category } = this.state;
        const { layoutName, checkClass } = this.props;
        return (
            <div className={(layoutName !== 'layout-pc' ? 'row card pb-3' : '')}>
                {
                    layoutName !== 'layout-pc' &&
                    <div className={"card-header col-12 " + (checkClass)}>
                        <h4 className="card-title">Chuyên mục</h4>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>

                }

                <div className="card-body col-12 direct-chat-messages" style={{ padding: "1.25rem" }}>
                    <div className="form-group">
                        <div className="row">
                            
                        <label>Chuyên mục </label>
                        <Input
                            icon="search"
                            placeholder="Tìm kiếm"
                            value={this.state.value}
                            onChange={value => {
                                this.setValueTitle(value);
                            }}
                            onSubmit={value => {
                              this.searchPosts(value);
                            }}
                          />
                        </div>
                       
                        <ul className="todo-list ui-sortable" data-widget="todo-list">
                            {category && category.map((cat, idx) => {
                                return (
                                    <React.Fragment key={`cat__1_${idx}`}>
                                        <li className="category-level-0" key={`cat_0_${idx}`}>
                                            <div className="icheck-success d-inline ml-2">
                                                <input type="checkbox" name="category" disabled={cat.primary} checked={!!cat.selected} id={`radioCat${cat._id}`} value={cat._id} onChange={this.selectCategory} />
                                                <label htmlFor={`radioCat${cat._id}`}>
                                                </label>
                                            </div>
                                            <span className="text">{cat.name}</span>
                                            {(cat.selected && !cat.primary) && <strong onClick={() => this.makePrimary(cat)} className="text-sm color-palette cursor-pointer color-ed1c24"> (Đặt làm chuyên mục chính)</strong>}
                                            {(cat.selected && cat.primary) && <small className="badge badge-success"> Chuyên mục chính</small>}
                                        </li>
                                        {/* sub cat 1 */}
                                        {cat.categories && cat.categories.map((cat_1, idx_1) => {
                                            if(cat_1){
                                                return (
                                                    <React.Fragment key={`cat__0_${idx_1}`}>
                                                        <li className="category-level-1" key={`cat_1_${idx_1}`}>
                                                            <div className="icheck-success d-inline ml-2">
                                                                <input type="checkbox" name="category" checked={!!cat_1.selected}
                                                                    id={`radioCat${cat_1._id}`} value={cat_1._id} onChange={this.selectCategory} />
                                                                <label htmlFor={`radioCat${cat_1._id}`}>
                                                                </label>
                                                            </div>
                                                            <span className="text">{cat_1.name}</span>
                                                        </li>
                                                        {/* sub cat 2 */}
                                                        {cat_1.categories && cat_1.categories.map((cat_2, idx_2) => {
                                                            return (
                                                                <React.Fragment key={`cat__0_${idx_2}`}>
                                                                    <li className="category-level-2" key={`cat_2_${idx_2}`}>
                                                                        <div className="icheck-success d-inline ml-2">
                                                                            <input type="checkbox" name="category" checked={!!cat_2.selected}
                                                                                id={`radioCat${cat_2._id}`} value={cat_2._id} onChange={this.selectCategory} />
                                                                            <label htmlFor={`radioCat${cat_2._id}`}>
                                                                            </label>
                                                                        </div>
                                                                        <span className="text">{cat_2.name}</span>
                                                                    </li>
                                                                </React.Fragment>
                                                            )
                                                        })}
                                                    </React.Fragment>
                                                )
                                            }
                                            
                                        })}
                                    </React.Fragment>
                                )
                            })}

                        </ul>

                    </div>

                </div>

            </div>






        )
    }

};


export default connect(store => {
    return {
        post: store.post,
        config: store.config,
        loginInfo: store.loginInfo
    };
}, dispatch => {
    return {
        setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    }
})(CategoryTab)
