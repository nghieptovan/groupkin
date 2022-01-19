import React, { Component } from "react";
import { connect } from "react-redux";
import * as homeActions from "../../store/action/home";
import * as postActions from "../../store/action/post";
import * as _ from "lodash";
import "../posts/post.scss";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import ItemHomepage from "./item";
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from 'react-toastify';

const DragHandle = sortableHandle(() => (
  <span
    className="handle ui-sortable-handle position-absolute"
    style={{ top: "50%", transform: "translateY(-50%)" }}
  >
    <i className="fas fa-ellipsis-v"></i>
    <i className="fas fa-ellipsis-v"></i>
  </span>
));

const SortableItem = sortableElement(({ value }) => (
  <li key={`itemhome${value._id}`} className="position-relative p-0">
    <DragHandle />
    <ItemHomepage item={value} />
  </li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <>
      <ul
        className="todo-list ui-sortable"
        data-widget="todo-list"
        style={{ overflow: "unset" }}
      >
        {children}
      </ul>
    </>
  );
});

class HomepageList extends Component {
  isMobile = false;
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      postsList: [],
      existPost: [],
      originalList: []
    };
  }

  componentDidMount() {
    ApiService.get(
      "/posts?_sort=updatedAt:DESC&_start=0&_limit=50&type=da-dang"
    ).then(result => {
      if (result) {
        const { posts } = result;
        this.setState({ originalList: posts });

        this.actionPostList();
      }
    });

  }
  actionPostList() {
    let { postsList, items, originalList } = this.state;

    // let existPost = _.map _.pick(items, 'post');
    let existPost = _.map(items, ({ post }) => post);
    // console.log(existPost);

    _.forEach(originalList, (itm, idx) => {
      if (
        !_.some(existPost, { _id: itm._id }) &&
        !_.some(postsList, { _id: itm._id })
      ) {
        postsList.push({
          _id: itm._id,
          value: itm._id,
          title: itm.title,
          img_hor: itm.img_hor,
          categories: itm.categories,
          idx,
          publishedAt: itm.publishedAt
        });
      }
    });

    this.setState({ postsList: _.union(postsList) });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { items, existPost, originalList } = this.state;
    const { homepage } = this.props;
    const { homepage: nextHome } = nextProps;
    if (
      homepage.updateHomePost != nextHome.updateHomePost &&
      nextHome.updateHomePost._id
    ) {
      // console.log(nextHome.updateHomePost);

      let findIndex = _.findIndex(items, itm => {
        return itm.id == nextHome.updateHomePost.id;
      });
      items[findIndex].post = nextHome.updateHomePost.post;
      let postsList = [];
      // console.log(items);

      let existPost = _.map(items, ({ post }) => post);
      _.forEach(originalList, (itm, idx) => {
        if (!_.some(existPost, { _id: itm._id })) {
          postsList.push({
            _id: itm._id,
            value: itm._id,
            title: itm.title,
            img_hor: itm.img_hor,
            categories: itm.categories,
            idx,
            publishedAt: itm.publishedAt
          });
        }
      });
      this.props.updateHomePostList(postsList);
      this.setState({ items: items, postsList }, () => {
        this.actionPostList();
      });
    }
  }
  onSortEnd = ({ oldIndex, newIndex }) => {


    let { items } = this.state;

    // const oldOrder = items[oldIndex].order
    // const newOrder = items[newIndex].order

    // console.log(oldOrder, oldIndex);
    // console.log(newOrder, newIndex);

    items = arrayMove(items, oldIndex, newIndex);
    this.setState({ items: items }, () => {
      // console.log(items);

      _.forEach(items, (itm, index) => {
        // console.log(itm.order);
        // console.log(index+ 1);
      });

    });
    if (!toast.isActive("updateHomepageList")) {
      toast.success("Câp nhật thành công!", {
        toastId: "updateHomepageList"
      })
    }
  };

  render() {
    const { items } = this.state;
    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value._id}`}
            index={index}
            value={{ ...value, postList: this.state.postsList }}
          />
        ))}
      </SortableContainer>
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
      updateHomePostList: value => {
        dispatch(homeActions.updateHomePostList(value));
      }
    };
  }
)(HomepageList);
