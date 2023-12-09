
const create = async (user) => {
    try {
        let response = await fetch('http://localhost:3001/api/users/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: "cors",
          // credentials: "same-origin",
          body: JSON.stringify(user)
        });
        if (response) {
          return await response.json();
        }
        return "Error: No response"
    } catch(err) {
      console.log(err)
    }
  }
  
  const list = async (signal) => {
    try {
      let response = await fetch('http://localhost:3001/api/users/', {
        method: 'GET',
        signal: signal,
        mode: "cors",
        credentials: "same-origin"
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const update = async (user) => {
    try {
      let response = await fetch('http://localhost:3001/api/users/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify(user)
      })
      
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  const remove = async (user) => {
    try {
      let response = await fetch('http://localhost:3001/api/users/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: "cors",
        credentials: "same-origin"
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  export default {
    create,
    list,
    update,
    remove
  }     