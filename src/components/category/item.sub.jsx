import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../store/action/post'
import _ from 'lodash'
import Link from 'src/components/link'
import Status from 'src/components/util/status'
import Date from 'src/components/util/date'
import localStore from 'src/utils/local-storage'
import ImageLoader from '../../components/image-loader/ImageLoader'
const CONTENT_URL = process.env.REACT_APP_CONTENT;
class SubCategoryItem extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    viewSubCategory = () => {
        this.props.viewSubCategory(this.props.item)
    }


    render() {
        const { item, idx, config } = this.props;
        return (
            <tr key={`post-${idx}`}>
          
                <td className="title" onClick={this.viewSubCategory}>
                    {item.name || 'Chưa đặt tên'}
                    <div className={"tools tools-posts" + (this.state.onHover ? ' active' : '')}>{(this.state.showEdit) &&
                        <Link to={`/posts/edit/${item._id}`} className="btn btn-danger btn-sm">
                            <i className="fas fa-pencil-alt"></i> Edit
                    </Link>
                    }      </div>
                </td>
                <td >
                    <span>{item.url}</span>
                </td>
                <td >
                 <span>{item.status ? 'Bật' : 'Tắt'}</span>
                </td>
                

                <td>
                    <Link to={`/categories/edit/${item._id}`} className="btn btn-success btn-sm">
                        <i className="fas fa-pencil-alt"></i> Edit
                    </Link>
                </td>
            </tr>
        )
    }

};
export default connect(store => {
    return {
        login: store.loginInfo,
        config: store.config
    };
}, dispatch => {
    return {
        setCurrentPost: (value) => { dispatch(postActions.setCurrentPost(value)) },
        deletePost: (value) => { dispatch(postActions.deletePost(value)) },
    }
})(CategoryItem)
