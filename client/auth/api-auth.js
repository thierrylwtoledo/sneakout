const signin = async (user) => {
    try {
        let response = await fetch('http://localhost:3001/api/auth/signin/', {
            method: "POST"
            ,headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
            ,mode: 'cors'
            ,body: JSON.stringify(user)
            ,credentials: "same-origin"
        })
        return await response.json()
        
    } catch (err) {
        console.log(err)
    }
}
const signout = async () => {
    try {
        let response = await fetch('http://localhost:3001/api/auth/signout/', {
            method: 'GET',
            mode: 'cors'
        })
        
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export default { signin, signout };