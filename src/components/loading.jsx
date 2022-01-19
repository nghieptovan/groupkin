import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render(){
        let { show = false } = this.props
        return(
            <div className={ show ? '' : 'hidden' }>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </div>
        );
    }
}
export default Loading;
