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
    this.addDevItem = this.addDevItem.bind(this);
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

//Adding the new list item and passing down to DevForm
addDevItem(newURL) {
  fetch(APIURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  body: JSON.stringify({name: newURL}) 
  })
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
  .then(newDevItem => {
  this.setState({bibleList: [...this.state.bibleList, newDevItem]})
})
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
        <DevForm addDevItem={this.addDevItem}/>
        <ul>
          {bibleList}
        </ul>
      </div>
    );
  }
}

export default DevBible;