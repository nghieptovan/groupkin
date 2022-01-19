import React, { Component } from 'react'
import { connect } from 'react-redux'
// import localStorage from '../../../utils/local-storage'
import * as _ from 'lodash'

class UserCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            selectCategory: [],
            loadedData: false,
            primary_category: props.primary_category || null
        }
    }
    componentDidMount() {
        this.getData();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    getData(props) {
        let { selectCategory, loadedData } = this.state;
        const { config: nextConfig, usercategories } = props || this.props;
        let category = [];
        if (nextConfig.listCategory && nextConfig.listCategory.length > 0 && !loadedData) {
            
            let tempCategory = nextConfig.listCategory;
            _.forEach(tempCategory, (cat) => {
                    // add to selected category level 0
                if (_.some(usercategories, { "_id": cat._id })) {
                    cat.selected = true;
                    selectCategory.push(cat);
                } else {
                    cat.selected = false;
                }

                if (cat.categories) {
                    // check level 1 => add to selected category level 1
                    _.forEach(cat.categories, (cat1) => {
                        if(cat1){
                            if (_.some(usercategories, { "_id": cat1._id })) {
                                cat1.selected = true;
                                selectCategory.push(cat1);
                            } else {
                                cat1.selected = false;
                            }
                            if (cat1.categories) {
                                // check level 2 => add to selected category level 2
                                _.forEach(cat1.categories, (cat2) => {
                                    if (_.some(usercategories, { "_id": cat2._id })) {
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
   
            this.setState({ category, loadedData: true, selectCategory });
        }
     
    }

    selectCategory = (e) => {
        let { category, selectCategory } = this.state;
        _.map(category, (cat_0) => {
            if (cat_0._id === e.target.value) {
                cat_0.selected = !cat_0.selected
            }
            _.map(cat_0.categories, (cat_1) => {
                if(cat_1){
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
                }
                
            })

        })
        _.forEach(category, (cat_0) => {
            if (cat_0.selected) {
                selectCategory.push(cat_0)
            } else {
                _.remove(selectCategory, (cate) => { return cate._id == cat_0._id });
            }
            _.forEach(cat_0.categories, (cat_1) => {
                if(cat_1){
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
                }
            })
        })
        selectCategory = _.unionBy(selectCategory, '_id');
        this.setState({ category, selectCategory }, () => this.props.changecategory(selectCategory));
    }

    makePrimary(cate) {
        
        this.setState({ primary_category: cate }, () => {
            this.props.onselectprimary(cate);
        });
    }
 
    render() {
        const { category,primary_category } = this.state;
        return (
            
            <ul className="todo-list ui-sortable" data-widget="todo-list">
            {category && category.map((cat, idx) => {
                return (
                    <>
                        <li className="category-level-0" key={`cat_0_${cat._id}`}>
                            <div className="icheck-success d-inline ml-2">
                                <input type="checkbox" name="category" disabled={primary_category && cat.id == primary_category.id} checked={!!cat.selected} id={`radioCat${cat._id}`} value={cat._id} onChange={this.selectCategory} />
                                <label htmlFor={`radioCat${cat._id}`}>
                                </label>
                            </div>
                            <span className="text">{cat.name}</span>

                            {(cat.selected && (!primary_category || primary_category.id != cat.id)) && <strong onClick={() => this.makePrimary(cat)} className="text-sm color-palette cursor-pointer color-ed1c24"> (Đặt làm chuyên mục chính)</strong>}
                            {(cat.selected && primary_category && primary_category.id == cat.id) && <small className="badge badge-success"> Chuyên mục chính</small>}
                        </li>
                        {/* sub cat 1 */}
                        {cat.categories && cat.categories.map((cat_1, idx_1) => {
                            if(cat_1)
                            return (
                                <>
                                    <li className="category-level-1" key={`cat_1_${cat_1._id}`}>
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
                                          
                                                <li className="category-level-2" key={`cat_2_${cat_2._id}`}>
                                                    <div className="icheck-success d-inline ml-2">
                                                        <input type="checkbox" name="category" checked={!!cat_2.selected}
                                                            id={`radioCat${cat_2._id}`} value={cat_2._id} onChange={this.selectCategory} />
                                                        <label htmlFor={`radioCat${cat_2._id}`}>
                                                        </label>
                                                    </div>
                                                    <span className="text">{cat_2.name}</span>
                                                </li>
                                           
                                        )
                                    })}
                                </>
                            )
                        })}
                    </>
                )
            })}

        </ul>

        )
    }

};


export default connect(store => {
    return {
        post: store.post,
        config: store.config,
        loginInfo: store.loginInfo,
        user: store.user
    };
}, dispatch => {
    return {
        // setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    }
})(UserCategory)
