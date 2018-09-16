import React, {Component} from 'react';
import BibleItem from './BibleItem';
const APIURL = '/api/todos';

class DevBible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
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
  .then(todos => this.setState({todos}));
}
  render() {
    const bibleList = this.state.todos.map((t) => (
      <BibleItem
        key={t._id}
        {...t}
      />
      ));
    return (
      <div>
        <h1>Dev Bible</h1>
        <ul>
          {bibleList}
        </ul>
      </div>
    );
  }
}

export default DevBible;