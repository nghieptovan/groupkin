import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeActions from "../../store/action/home";
import * as postActions from "../../store/action/post";
import * as _ from "lodash";
import "../posts/post.scss";
import moment from "moment";
import Select, { components } from "react-select";
import Date from "src/components/util/date";
import ApiService from "../../services/ApiService";
import ScreenSize from "../../services/screenSize";
import ImageLoader from '../../components/image-loader/ImageLoader';
import { ToastContainer, toast } from 'react-toastify';

const generateCategory = (idx, category) => {
  category = _.unionBy(category, "_id");
  let stringBuilder = [];

  // console.log("option", categories);
  // let objects = this.props.config.listCategory;
  // let others = category;

  // const newCate = _.intersectionWith(objects, others, _.isEqual);
  console.log(category);
  if (category) {
    category.forEach((cat, index) => {
      if (index === 0 && cat) {
        let name = "";

        const a = index === 0 ? "" : "- ";
        name = a + (cat.name || '');

        let stringBuilder1 = (
          <a
            key={`item-category${cat._id}${idx}${index}`}
            className="mr-1"
            href="#"
          >
            {name}
          </a>
        );
        stringBuilder.push(stringBuilder1);
      }
    });
  }
  return stringBuilder;
};

const Option = ({ children, ...props }) => {
  const { innerProps, innerRef } = props;
  let { title, img_hor, img_ver, categories, idx, publishedAt } = props.data;
  img_ver = img_ver ? img_ver : '';

  return (
    <components.Option {...props}>
      <div
        ref={innerRef}
        {...innerProps}
        className="d-flex"
        style={{ width: "90%" }}
      >
        <ImageLoader className="d-none d-lg-block" classImg="img-avatar-size mt-1" src={ScreenSize.isMobile ? img_ver : img_hor} />
        <div className="ml-2">
          <p className="text-ellipsis lc-lg-1 mb-1">{title}</p>
          {generateCategory(idx, categories)}
          <Date
            updated_at={publishedAt}
            typecode="ready"
            className="d-inline-block text-secondary"
          />
        </div>
      </div>

      {children}
    </components.Option>
  );
};

const ValueContainer = ({ children, ...props }) => {
  const {
    title,
    img_hor,
    img_ver = '',
    categories,
    idx,
    publishedAt
  } = props.selectProps.value;

  return (
    <components.ValueContainer {...props}>
      <div className="d-flex" style={{ width: "90%" }}>
        <ImageLoader className="d-none d-lg-block" classImg="img-avatar-size mt-1" src={ScreenSize.isMobile ? img_ver : img_hor} />

        <div className="ml-2">
          <p className="text-ellipsis lc-lg-1 mb-1">{title}</p>
          {generateCategory(idx, categories)}
          <Date
            updated_at={publishedAt}
            typecode="ready"
            className="d-inline-block text-secondary"
          />
        </div>
      </div>
      {children}
    </components.ValueContainer>
  );
};

class ItemHomepage extends Component {
  isMobile = false;
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      postSelected: {}
    };

    // this.isMobile = ScreenSize.isMobile;
  }

  findSelected(itemInput) {
    const { item } = this.state;

    if (item.postList) {
      let data = _.filter(item.postList, itm => itm._id == itemInput._id);
      if (data) {
        this.setState({ postSelected: data ? data : {} });
        return data;
      }
    }
    // console.log(itemInput);

    return itemInput;
  }

  onSelectHomepageItem(value) {
    const { item } = this.state;
    item.post = value;
    ApiService.put(`/homepages/${item.id}`, item).then(result => {
      this.setState({ item: result }, () => {
        if (!toast.isActive("updateHomepage")) {
          toast.success("Câp nhật thành công!", {
            toastId: "updateHomepage"
          })
        }
        this.props.updateHomeItem(result);
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { homepage } = this.props;
    const { homepage: nextHome } = nextProps;
    if (
      homepage.updateHomePostList != nextHome.updateHomePostList &&
      nextHome.updateHomePostList
    ) {
      const { item } = this.state;
      item.postList = nextHome.updateHomePostList;
      this.setState({ item: item });
    }
  }

  render() {
    const { item } = this.state;

    return (
      <span
        className="text position-relative w-100"
        style={{ left: "20px", paddingRight: "30px" }}
      >
        <Select
          value={item.post}
          options={item.postList}
          onChange={value => this.onSelectHomepageItem(value)}
          isSearchable={true}
          components={{
            Option,
            ValueContainer,
            DropdownIndicator: () => null
          }}
        />
      </span>
    );
  }
}

export default connect(
  store => {
    return {
      homepage: store.homepage,
      router: store.router,
      posts: store.post.listPost,
      config: store.config
    };
  },
  dispatch => {
    return {
      getListHomepage: value => {
        dispatch(homeActions.getListHomepage(value));
      },
      createHomepageItem: value => {
        dispatch(homeActions.createHomepageItem(value));
      },
      updateHomepageItem: value => {
        dispatch(homeActions.updateHomepageItem(value));
      },
      deleteHomepageItem: value => {
        dispatch(homeActions.deleteHomepageItem(value));
      },
      getListPost: value => {
        dispatch(postActions.getListPost(value));
      },
      updateHomeItem: value => {
        dispatch(homeActions.updateHomeItem(value));
      }
    };
  }
)(ItemHomepage);
