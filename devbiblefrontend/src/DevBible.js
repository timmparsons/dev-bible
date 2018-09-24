import React, {Component} from 'react';
import BibleItem from './BibleItem';
import DevForm from './DevForm';
import * as apiCalls from './api';
// const APIURL = '/api/todos/';

class DevBible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bibleList: []
    };
    this.addDevItem = this.addDevItem.bind(this);
  }
  
  componentWillMount() {
    this.loadDevList();
  }
  
  
  // Load devlist from API
  async loadDevList() {
    let bibleList = await apiCalls.getDevList();
    this.setState({bibleList});
  }

  //Adding the new list item and passing down to DevForm
  async addDevItem(newURL) {
    let newDevItem = await apiCalls.addDevItem(newURL);
    this.setState({bibleList: [...this.state.bibleList, newDevItem]})
  }

  //Delete item from list
  async deleteDevItem(id) {
    await apiCalls.removeDevItem(id);  
    const bibleList = this.state.bibleList.filter(devListItem => devListItem._id !== id);
    this.setState({bibleList: bibleList});
  }

  render() {
    const bibleList = this.state.bibleList.map((devBibleDataFromAPI) => (
      <BibleItem
        key={(devBibleDataFromAPI._id)}
        {...(devBibleDataFromAPI)}
        onDelete={this.deleteDevItem.bind(this, devBibleDataFromAPI._id)}
      />
      ));
    return (
      <div>
        <h1>Dev Bible</h1>
        <DevForm addDevItem={this.addDevItem}/>
        <ul>
          {bibleList}
        </ul>
      </div>
    );
  }
}

export default DevBible;