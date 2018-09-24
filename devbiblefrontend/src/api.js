const APIURL = '/api/todos/';

export async function getDevList() {
  return fetch(APIURL)
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
}

export async function addDevItem(newURL) {
  return fetch(APIURL, {
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
}

export async function removeDevItem(id) {
  const deleteURL = APIURL + id;
  fetch(deleteURL, {
    method: 'delete'
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
}