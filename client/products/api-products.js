const create = async (sneaker) => {
    try {
        let response = await fetch('http://localhost:3001/api/products/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(sneaker)
        });
        if (response) {
            return await response.json();
        }
        return "Error: No response"
    } catch (err) {
        console.log(err)
    }
}

const list = async (signal) => {
    try {
        let response = await fetch('http://localhost:3001/api/products/', {
            method: 'GET',
            signal: signal,
            mode: "cors",
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (sneaker) => {
    try {
        let response = await fetch('http://localhost:3001/api/products/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(sneaker)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (sneaker) => {
    try {
        let response = await fetch('http://localhost:3001/api/products/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify(sneaker)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export default {
    create,
    list,
    update,
    remove
}     