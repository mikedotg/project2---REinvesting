// handles the login form 
const formHandler = async (event) => {
    // prevents event default and aloows for other functions to pass trough before immediately continuing the event 
    event.preventDefault()
    // grabs the email and password 
    const email = document.querySelector('#emailInput')
    const password = document.querySelector('#pwInput')
    // if email and password are present, move forward with the fetch call to the login
    if (email && password) {
        // make fetch call to the data base 
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content Type': 'application/json'}
        })
        // if the fetch call goes through 
        if (response.ok) {
            // if response works, send user to home page 
            document.location.replace('/')
        } else {
            alert('Failed login')
        }
    }
}