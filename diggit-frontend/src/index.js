window.addEventListener('DOMContentLoaded', (event) => {
    userModal();
    Submission.loadSubmissions();
    addSubmissionEvents()
});

const signup = document.getElementById("signup");
const login = document.getElementById("login");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const userBox = document.getElementById("user-box");
const createSubmission = document.getElementById("create-submission");
const submissionModal = document.getElementById("submission-modal");
const submissionModalHeader = document.getElementById("submission-modal-header");
const submissionModalContent = document.getElementById("submission-modal-content");
const submissionList = document.getElementById("submission-list");
const submissionModalTitle = document.getElementById("submission-modal-title");

function userFormHTML(type) {
    return(`
    <form id="user-form">
    <label for="username">Username</label>
    <input type="text" name="username" id="username">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">
    <input type="submit" value="${type}">
    </form>
    `)
}
    

const hideModal = function() {
    modal.style.display = "none";
    submissionModal.style.display = "none";
}



function userModal() {

    login.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = "block";
        modalContent.innerHTML = userFormHTML("Log In")

        let userForm = document.getElementById("user-form")

        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            API.logIn()
        })
    })
   
    signup.addEventListener('click', function(event) {
        event.preventDefault();
        modal.style.display = "block";
        modalContent.innerHTML = userFormHTML("Sign Up")

        let userForm = document.getElementById("user-form")

        userForm.addEventListener('submit', function(event) {
            event.preventDefault();
            API.signUp()
        })
    })

    modal.addEventListener('click', function(event){
        if (event.target === modal) {
            hideModal();
        }
    })

}

// function loadSubmissions(cat="all") {
//     if (cat === "all") {
//         fetch('http://localhost:3000/api/v1/submissions')
//         .then(r => r.json())
//         .then(data => {
//             addSubmissionsToDom(data)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     }
// }

// const htmlifySubmissions = function(sub){
//     return(` 
//         <div class="submissionRow">
//             <a href="${sub.link}" class="submission-link">${sub.link}</a>
//         </div>
//     `)
// }

// function addSubmissionsToDom(subs){
//     subs.forEach(function(sub){
//         renderSubmission(htmlifySubmissions(sub))
//     })
// }

// function renderSubmission(sub) {
//     submissionList.innerHTML += sub
// }

createSubmission.addEventListener('click', function(event){
    event.preventDefault();
    modal.style.display = "block";
    modalContent.innerHTML = `
        <form id="submission-form">
            <label for="link">Title:</label><br>
            <input type="text" name="title" id="title"><br><br>

            <label for="link">Link:</label><br>
            <input type="text" name="link" id="link"><br><br>

            <input type="submit" value="Submit">
        </form>
        `

    let submissionForm = document.getElementById("submission-form")

    submissionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        API.postSubmission();
        // fetch('http://localhost:3000/api/v1/submissions', {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${localStorage.token}`,
        //         'Content-Type': 'application/json',
        //         Accept: 'application/json'
        //     },
        //     body: JSON.stringify({
        //         submission: {
        //             link: document.getElementById('link').value
        //         }
        //     })
        // })
        // .then(r => r.json())
        // .then(result => {
        //     if (result.message) {
        //         modalContent.prepend(result.message)
        //     } else {
        //         loadSubmissions();
        //     }
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    })

    
})

function addSubmissionEvents() {
    submissionList.addEventListener('click', function(event){
        if (event.target.className === "submission-link") {
            event.preventDefault();
            const submissionId = event.target.parentElement.parentElement.id
            Submission.fullDisplay(submissionId);

        }
    })
}

