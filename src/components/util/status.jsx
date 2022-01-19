import React, { Component } from 'react'
import moment from 'moment'
class Status extends Component {
    render() {
        let { ...props } = this.props;
        let classSet = 'bg-purple';
        let classIcon = 'far fa-comments'
        let title = props.posttype.title || '';
        const type_code = props.posttype.type_code || 'draft';

        switch (type_code) {
            case 'draft':
                classIcon = 'far fa-edit';
                classSet = 'badge bg-purple';
                break;
            case 'waiting':
                classIcon = 'far fa-comments';
                classSet = 'badge badge-warning';
                break;
            case 'schedule':
                classIcon = 'fas fa-calendar-alt';
                classSet = 'badge badge-success';
                break;
            case 'trash':
                classIcon = 'fas fa-trash';
                classSet = 'badge badge-dark';
                break;
            case 'ready':
                classIcon = 'fas fa-check';
                classSet = 'badge badge-primary';
                break;
            default:
                title = '';
                break;
        }

        return (
            title && <p style={{ marginBottom: "5px" }} className={classSet}><i className={classIcon}></i> {title}</p>
        )

    }
}

export default Status
