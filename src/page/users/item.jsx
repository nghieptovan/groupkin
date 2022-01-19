import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/action/user'
import _ from 'lodash'
import Link from 'src/components/link'
import Status from 'src/components/util/status'
import Date from 'src/components/util/date'
import localStore from 'src/utils/local-storage'
import ImageLoader from '../../components/image-loader/ImageLoader';
const CONTENT_URL = process.env.REACT_APP_CONTENT;

class UserItem extends Component {
    constructor() {
        super();
        this.state = {
            showEdit: false,
            onHover: false
        };
    }

    editUser(user) {
        this.props.setCurrentUser(user);
    }

    render() {
        const { item, idx, config } = this.props;
        let category = item.categories ? _.map(item.categories, 'name').join(", ") : [];
        // console.log(category)
        return (
            <tr key={`post-${idx}`}>
                {/* <td style={{width:'50px'}}>
                <div className="icheck-primary">
                    <input type="checkbox" value="" id={`check${item._id}`} />
                    <label htmlFor={`check${item._id}`}></label>
                </div>
                </td>               */}
                <td className="thumbnail" style={{ width: '100px' }}>
                    {(item.avatar &&
                        <ImageLoader className="lazyload" src={CONTENT_URL + item.avatar.hash + item.avatar.ext} />) || <img src={process.env.PUBLIC_URL + "assets/images/100x100.png"} />}
                </td>
                <td><p>{item.username || '-'}</p></td>
                <td><p>{item.email || '-'}</p></td>
                <td><p>{(item.role && item.role.description) || '-'}</p></td>
                <td><p>{category || '-'}</p></td>
                <td>
                    <Link to={`/users/edit/${item._id}`} onClick={() => this.editUser(item)} className="btn btn-success btn-sm">
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
        setCurrentUser: (value) => { dispatch(userActions.setCurrentUser(value)) },
    }
})(UserItem)
