import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../../../components/editor/editor';


class EditorPage extends Component {
  render() {
    return (
      <div>
        This is editor page
        <Editor />
      </div>
    );
  }
}


EditorPage.propTypes = {
  
};


export default EditorPage;
