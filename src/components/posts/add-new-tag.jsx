import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as configActions from '../../store/action/config'


class AddNewTag extends Component{
    constructor() {
        super();
        this.state = {
            valueInput: '',
            onHover: false
        };
        this.contentCreator = React.createRef();
    }

    handleInput = (e) => {
        if (e.which === 13 || e.keyCode === 13) {
            this.addContentCreator();
        }else{
            this.setState({valueInput: e.target.value});
        }
    }

    addContentCreator() {
        if(this.state.valueInput && this.state.valueInput.length > 3){
            let data = {
                label: this.state.valueInput,
                status: true
              }
            this.props.createNewTag(data);
            this.contentCreator.value = '';
            this.setState({valueInput: ''});
        }        
    }
    

    render() {
        const { label } = this.props;
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
        createNewTag: (value) => { dispatch(configActions.createNewTag(value))},    
    }
})(AddNewTag)
