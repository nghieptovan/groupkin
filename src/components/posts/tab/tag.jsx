import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { renderFormField, renderTextAreaField } from '../../../utils/reduxField'
import { DraggableAreasGroup } from 'react-draggable-tags'
import * as _ from 'lodash'
import Select from 'react-select'
import AddContentCreator from '../../../components/posts/add-content-creator'
import CreatorItem from './creator-item/creator-item'
import TagRecommendation from './tag-recommendation';
const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();
class TagTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: props.post.currentPost.tags || []
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { post: { currentPost: nextCurrentPost } } = nextProps; 
        let { tags } = this.state;
        if(tags != nextCurrentPost.tags){
            this.setState({tags: nextCurrentPost.tags});
        }
    }
  
    render() {
        const { layoutName, checkClass, post: { currentPost } } = this.props;
        let { tags } = this.state;
        
        return (
            <div className={(layoutName !== 'layout-pc' ? 'row card' : '')}>
                {
                    layoutName !== 'layout-pc' &&
                    <div className={"card-header col-12 " + (checkClass)}>
                        <h4 className="card-title">Tag</h4>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                }

                <div className="card-body col-12">
                    <CreatorItem creatable={true} functioncreate="createNewTag" functioncall="getListTag" newapi="/tags" valueinstore="listTags" posttype="tags"
                        type="tags" selectedValue={tags} isClearable={true} label="Chọn tag cho bài viết (Tối thiểu 3 tag)" placeholder="Chọn tag cho bài viết" ismulti={true} />
                    <TagRecommendation pickRecommendedTag={this.pickRecommendedTag} />
                    <CreatorItem creatable={true} functioncreate="createNewSeries" functioncall="getListTag" newapi="/tags" valueinstore="listTags" posttype="series"
                        type="series" selectedValue={currentPost.series} isClearable={true} label="Series" placeholder="Chọn series cho bài viết" ismulti={false} />
                </div>


            </div>


        )
    }

};

export default connect(store => {
    return {
        post: store.post,
        config: store.config,
    };
}, dispatch => {
    return {
        setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
    }
})(TagTab)
