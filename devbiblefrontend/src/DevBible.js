import React, {Component} from 'react';
import BibleItem from './BibleItem';
import DevForm from './DevForm';
const APIURL = '/api/todos';

class DevBible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bibleList: []
    };
    this.addNewItem = this.addNewItem.bind(this);
  }
  
  componentWillMount() {
    this.loadTodos();
  }
  
  loadTodos() {
    fetch(APIURL)
    .then(response => {
      if(!response.ok) {
        if(response.status >=400 && response.status < 500) {
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          }) 
        } else {
          let err = {errorMessage: 'Please try again later, server not sending response'};
          throw err;
      }
    }
    return response.json();
  })
  .then(bibleList => this.setState({bibleList}));
}

addNewItem(val){
  console.log("Adding new item from DevBible Component: ", val)
}

  render() {
    const bibleList = this.state.bibleList.map((t) => (
      <BibleItem
        key={t._id}
        {...t}
      />
      ));
    return (
      <div>
        <h1>Dev Bible</h1>
        <DevForm addNewItem={this.addNewItem}/>
        <ul>
          {bibleList}
        </ul>
      </div>
    );
  }
}

export default DevBible;