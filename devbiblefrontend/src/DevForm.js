import React, {Component} from 'react';

class DevForm extends Component {
  constructor(props) {
    super(props);
    this.state = {inputValue:'Tim was here'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  
  handleSubmit() {
    this.props.addNewItem(this.state.inputValue)
      }
  render() {
    return (
      <div>
        <input 
          type='text' 
          value={this.state.inputValue}
          onChange={this.handleChange}
          />
        <button
          onClick={this.handleSubmit}>
            Add Item
          </button>
      </div>  
    )
  }
}
export default DevForm;