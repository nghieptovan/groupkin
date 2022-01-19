import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../store/action/post";
import * as configActions from "../../store/action/config";
import ApiService from "../../services/ApiService";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import NormalEditorTypePage from "./normal-editor-type-page";
import SpecialEditorTypePage from "./special-editor-type-page";
import MiniEditorTypePage from "./mini-editor-type-page";

class PreviewPage extends Component {
  isMobile = false;
  constructor(props) {
    super(props);
    this.state = {
      postContent: {}
    };
  }
  componentDidMount() {
    console.log(window.location.pathname);
    let idPage = window.location.pathname.replace("/preview/", "");
    console.log(idPage);

    // let idPage = this.props.match.params.id;
    // this.props.getPostById(postId);
    ApiService.get("/posts/" + idPage).then(result => {
      if (result._id) {
        this.setState({ postContent: result });
      } else {
        this.confirmAction();
      }

      // console.log("import result: ", result);
    });
  }

  confirmAction() {
    const options = {
      title: "Title",
      message: "Message",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        }
      ],
      childrenElement: () => <div />,
      customUI: ({ onClose }) => (
        <div className="custom-ui-alert">
          <h1>Không tìm thấy bài viết này.</h1>
          <div
            className="bg-c7c6c5 bg-c7c6c5 txt-center pt-3 pb-3"
            onClick={() => {
              onClose();
              window.location.href = "/";
            }}
          >
            Trở lại
          </div>
        </div>
      ),
      closeOnEscape: false,
      closeOnClickOutside: false
    };

    confirmAlert(options);
  }

  render() {
    let {
      postContent,
      postContent: {
        editor_type
      }
    } = this.state;
    console.log(editor_type);

    if (editor_type && editor_type === 'special') {
      return <SpecialEditorTypePage postContent={postContent} />;
    } else if (editor_type && editor_type === 'mini') {
      return <MiniEditorTypePage postContent={postContent} />;
    } else {
      return <NormalEditorTypePage postContent={postContent} />;
    }

  }
}

export default connect(
  store => {
    return {
      login: store.loginInfo,
      config: store.config,
      post: store.post
    };
  },
  dispatch => {
    return {
      createPost: value => {
        dispatch(postActions.createPost(value));
      },
      getPostById: value => {
        dispatch(postActions.getPostById(value));
      },
      updatePost: value => {
        dispatch(postActions.updatePost(value));
      }
    };
  }
)(PreviewPage);
