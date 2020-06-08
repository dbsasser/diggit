window.addEventListener('DOMContentLoaded', (event) => {
    userModal();
    loadSubmissions();
});

const signup = document.getElementById("signup");
const login = document.getElementById("login");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const userBox = document.getElementById("user-box");
const createSubmission = document.getElementById("create-submission")

function userModal() {

    login.addEventListener('click', function(event) {
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

        let userForm = document.getElementById("user-form")

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
                        username: document.getElementById('username').value,
                        password: document.getElementById('password').value
                    }
                })
            })
            .then(r => r.json())
            .then(result => {
                if (result.message) {
                    modalContent.prepend(result.message)
                } else {
                    userBox.innerHTML = `${result.user.username}`;
                    hideModal();
                }
            })
            .catch(error => {
                console.log(error)
            })
        })
    })
   
    signup.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = "block";
        modalContent.innerHTML = `
        <form id="user-form">
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
        <input type="submit" value="Sign Up">
        </form>
        `

        let userForm = document.getElementById("user-form")

        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            fetch('http://localhost:3000/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: document.getElementById('username').value,
                        password: document.getElementById('password').value
                    }
                })
            })
            .then(r => r.json())
            .then(result => {
                if (result.message) {
                    modalContent.prepend(result.message)
                } else {
                    userBox.innerHTML = `${result.user.username}`;
                    hideModal();
                }
            })
            .catch(error => {
                console.log(error)
            })
        })
    })

    modal.addEventListener('click', function(event){
        if (event.target === modal) {
            hideModal();
        }
    })


    const hideModal = function() {
        modal.style.display = "none";
    }
}

function loadSubmissions(cat="all") {
    if (cat === "all") {
        fetch('http://localhost:3000/api/v1/submissions')
        .then(r => r.json())
        .then(data => {
            addSubmissionsToDom(data)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

const htmlifySubmissions = function(sub){
    return(` 
        <div class="submissionRow">
            ${sub.link}
        </div>
    `)
}

function addSubmissionsToDom(subs){
    subs.forEach(function(sub){
        renderSubmission(htmlifySubmissions(sub))
    })
}

function renderSubmission(sub) {
    const submissionList = document.getElementById("submission-list");
    submissionList.innerHTML += sub
}

createSubmission.addEventListener('click', function(event){
    event.preventDefault();
    modal.style.display = "block";
    modalContent.innerHTML = `
        <form id="submission-form">
        <label for="link">Link:</label>
        <input type="text" name="link" id="link">
        <input type="submit" value="Submit">
        </form>
        `

    let userForm = document.getElementById("submission-form") 
    
})