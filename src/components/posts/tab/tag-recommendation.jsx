import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../../store/action/post'
import * as configActions from '../../../store/action/config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { renderFormField, renderTextAreaField } from '../../../utils/reduxField'
import { DraggableAreasGroup } from 'react-draggable-tags'
import * as _ from 'lodash'
import Select from 'react-select'
import CreatorItem from './creator-item/creator-item'
import axios from "axios";
import slug from 'slug';
import ApiService from "src/services/ApiService";

const AI_URL = process.env.REACT_APP_URL_AI;

class TagRecommendation extends Component {
  constructor() {
    super();
    this.state = {
      keywords: [],
      title: "",
      content: "",
      lengthContent: 300
    }
  }

  componentDidMount() {
    this.getData();     
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { post: { currentPost }, config: nextConfig } = nextProps || this.props;
    let { title, content, lengthContent } = this.state

    if(currentPost.content && currentPost.content.length >= lengthContent){
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
         this.setState({content : currentPost.content, title: currentPost.title}) 
         this.suggestAI();
      }, 10000);
    }

    // this.getData(nextProps);
  }

  getData(props) {
      
     
      
  }

  suggestAI() {
    const scope = this;
    const { post: {currentPost} } = this.props;
    let { title, content, lengthContent }  = this.state;
    content = this.strip_tags(content);
    if(content && content.length >= lengthContent){
        const requestOptions = {
            method: 'POST',
            url: AI_URL + '/v1/tagRecommendation',
            headers: {
              'Content-Type': 'application/json'
            },
            auth: {
              username: 'cmsai',
              password: 'hola'
            },
            data: {
              "data": {
                "title": title,
                "content": content
              }
            }
          }
          axios(requestOptions)
            .then(response => {
        
              if(response && response.data && response.data.response && response.data.response.keyword){

                  this.setState({
                      keywords: response.data.response.keyword
                    });
              }
      
            })
            .catch(function (error) {
              console.log(error);
            });
    }
    
  }

  strip_tags(input, allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
    return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
  }

  createTag = (inputValue) => {

    const { post: {currentPost} } = this.props;
    let tags = currentPost.tags;
    if(!_.some(tags, {'slug': slug(inputValue)})){
      let data = {
        label: inputValue,
        active: true,
        status: true,
        slug: slug(inputValue),
        increment_id: Math.floor(Math.random() * (10000))
      }
      ApiService.post("/tags", data).then(result => {
        this.updateTagForPost(result)
      });
    }
    
    
  };
  updateTagForPost(result){
    const { post: {currentPost} } = this.props;
    let tags = currentPost.tags;
    console.log(result);
    
    if(!_.some(tags, {'id': result.id})){
      if(!tags){
        tags = [result]
      }else{

        tags = _.concat(tags, result);
      }
      // tags = tags.push(result);

      currentPost.tags = tags;
      this.props.setCurrentPost(currentPost);
    }
  }

  render() {
    const { keywords } = this.state;
    return (
    
      (keywords && keywords.length > 0) && 
        <div className="row mb-4">
          <div className="col-12">
            <label className="d-block">Tag gợi ý</label>
            {keywords.length > 0 ?
              (
                keywords.map((word, idx) => {
                  return (
                    <span
                      style={{ padding: ".35rem .4rem 0.45rem .4rem" }}
                      className="btn btn-xs bg-gradient-info mr-2 mt-2"
                      key={idx}
                      onClick={(e) => this.createTag(word)}
                    >
                      {word}
                    </span>
                  );
                })
              ) : (
                <></>
              )
            }
          </div>
        </div>
      
    );
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
    createNewTag: (value) => { dispatch(configActions.createNewTag(value)) },
  }
})(TagRecommendation)
