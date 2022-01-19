import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as configActions from '../../store/action/config'
import * as _ from 'lodash'
import { toast } from 'react-toastify'
import slug from 'slug'
const CONTENT_URL = process.env.REACT_APP_CONTENT;

class AddContentCreator extends Component{
    constructor() {
        super();
        this.state = {
            valueInput: '',
            onHover: false
        };
        this.contentCreator = React.createRef();
    }

    handleInput = (e) => {
        if (e.which == 13 || e.keyCode == 13) {
            this.addContentCreator();
        }else{
            this.setState({valueInput: e.target.value});
        }
    }

    addContentCreator() {
        const { type, label } = this.props;

        if(this.state.valueInput && this.state.valueInput.length > 3){
            let data = {
                label: this.state.valueInput,
                active: true,
                status: true,
                slug: slug(this.state.valueInput)
            }
            this.contentCreator.value = '';
            this.setState({valueInput: ''});

            switch (type) {
                case "penname":
                    this.props.createPennames(data)
                    break;
                case "video":
                    this.props.createVideos(data)
                    break;
                case "photo":
                    this.props.createPhotographers(data)
                    break;
                case "designer":
                    this.props.createDesigners(data)
                    break;
                case "source":
                    this.props.createSources(data)
                    break;            
                case "tag":
                    this.props.createNewTag(data)
                    break;            
                case "series":
                    this.props.createNewSeries(data)
                    break;            
                default:
                    break;
            }
        }        
    }

    render() {
        const { type, label } = this.props;
        return (  
            <div className="form-group">
                <label>&nbsp;</label>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder={label} ref={this.contentCreator} onKeyUp={this.handleInput} />
                    <div className="input-group-append">
                    <span className="input-group-text" onClick={() => this.addContentCreator()}><i className="fas fa-plus"></i></span>
                    </div>
                </div>
            </div>
        )
    }
  
};
export default connect( store => {
    return {
        config: store.config
      };
    } , dispatch => {
    return {
        createPennames: (value) => { dispatch(configActions.createPennames(value))},    
        createPhotographers: (value) => { dispatch(configActions.createPhotographers(value))},    
        createVideos: (value) => { dispatch(configActions.createVideos(value))},    
        createDesigners: (value) => { dispatch(configActions.createDesigners(value))},    
        createSources: (value) => { dispatch(configActions.createSources(value))},    
        createNewTag: (value) => { dispatch(configActions.createNewTag(value))},    
        createNewSeries: (value) => { dispatch(configActions.createNewSeries(value))},    
    }
})(AddContentCreator)
