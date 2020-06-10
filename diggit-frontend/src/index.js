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
    })

    
})

function addSubmissionEvents() {
    submissionList.addEventListener('click', function(event){
        if (event.target.className === "submission-link") {
            const submissionId = event.target.parentElement.parentElement.id
            event.preventDefault();
            Submission.fullDisplay(submissionId);
        } else if (event.target.className === "upvote-link") {
            const submissionId = event.target.parentElement.parentElement.parentElement.id
            event.preventDefault();
            Submission.upvote(event, submissionId);
        }
    })
}

