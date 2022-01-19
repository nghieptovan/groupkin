import React, { Component } from "react";
import { connect } from "react-redux";
import * as postActions from "../../../store/action/post";
import "react-toastify/dist/ReactToastify.css";
import {
  renderFormField,
  renderTextAreaField
} from "../../../utils/reduxField";
import { Field, reduxForm, formValueSelector, change } from "redux-form";
import { validateCreatePostForm } from "../../../utils/formValidation";

const validate = values => {
  return validateCreatePostForm(values, false);
};
const maxLength = max => value =>
  value && value.length > max ? `Độ dài tối đa ${max} ký tự` : undefined;
class DescriptionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      changeDesGoogle: false
    };
  }

  componentDidMount() {
    const {
      description, description_google
    } = this.props.post.currentPost

    if (!(description_google && description)) {
      this.setState({ changeDesGoogle: true })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      post: nextPost,
      fields: nextFields,
      currenttab: nextTab
    } = nextProps;
    const { fields, post, typepage, currenttab: currentTab } = this.props;
    // if (post.currentTabPost === 2 && nextPost.currentTabPost !== 2) {
    //   const { description, description_google } = nextFields;
    //   const { currentPost } = nextPost;
    //   currentPost.description = description ? description : ''
    //   currentPost.description_google = description_google ? description_google : ''
    //   this.props.setCurrentPost(currentPost);
    // }


    if (fields.description !== nextFields.description && nextFields.description) {
      nextPost.currentPost.description = nextFields.description;
      this.props.setCurrentPost(nextPost.currentPost);

      if (this.state.changeDesGoogle) {
        let des_google = nextPost.currentPost.description.split(".")[0];
        des_google = des_google.length > 160 ? des_google.slice(0, 160) : des_google;
        this.props.changeFieldValue("description_google", des_google);
      }
    }
    if (fields.description_google !== nextFields.description_google && nextFields.description_google) {
      nextPost.currentPost.description_google = nextFields.description_google;
      this.props.setCurrentPost(nextPost.currentPost);
    }
  }

  render() {
    const { type, label, layoutName, checkClass } = this.props;
    return (
      <div className={layoutName !== "layout-pc" ? "row card" : ""}>
        {layoutName !== "layout-pc" && (
          <div className={"card-header col-12 " + checkClass}>
            <h4 className="card-title">Tóm tắt nội dung</h4>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>
        )}

        <div className="card-body col-12">
          <Field
            readonly={this.props.readonly}
            id="description"
            name="description"
            component={renderTextAreaField}
            label="Tóm tắt nội dung"
          />
          <Field
            readonly={this.props.readonly}
            id="description_google"
            name="description_google"
            component={renderTextAreaField}
            label="Tóm tắt nội dung hiển thị trên Google (độ dài tối đa 160 ký tự)"
            maxLength="160"
            onKeyUp={() => { this.setState({ changeDesGoogle: false }) }}
          />
        </div>
      </div>
    );
  }
}
const selector = formValueSelector("formPostEdit");
DescriptionTab = reduxForm({
  form: "formPostEdit"
})(DescriptionTab);

export default connect(
  store => {
    return {
      post: store.post,
      form: store.formPostEdit,
      fields: selector(store, "description_google", "description")
    };
  },
  dispatch => {
    return {
      setCurrentPost: value => {
        dispatch(postActions.setCurrentPost(value));
      },
      changeFieldValue: (field, value) => {
        dispatch(change("formPostEdit", field, value));
      }
    };
  }
)(DescriptionTab);
