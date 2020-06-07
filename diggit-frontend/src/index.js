window.addEventListener('DOMContentLoaded', (event) => {
    userModal()
});

function userModal () {
    const signup = document.getElementById("signup");
    const login = document.getElementById("login");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    signup.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = "block";
        modalContent.innerHTML = `
        <form id="user-form">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
        <input type="submit" value="Log In">
        </form>
        `

        const userForm = document.getElementById("user-form")

        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            fetch('http://localhost:3000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: document.getElementById('username').value
                        password: document.getElementById('password').value
                    }
                })
            })
            .then(r => r.json())
            .then(console.log)
        })

        modal.addEventListener('click', function(event){
            if (event.target === modal) {
                modal.style.display ="none";
            }
        })
    })
}