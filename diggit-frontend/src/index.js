window.addEventListener('DOMContentLoaded', (event) => {
    userModal();
    Submission.loadSubmissions();
    addSubmissionEvents();
    navLinkEvents();
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
const navAll = document.getElementById("all");
const navFunny = document.getElementById("1");
const navAmazing = document.getElementById("2");
const navTech = document.getElementById("3");
const navNews = document.getElementById("4");
const navVideos = document.getElementById("5");
const navLinks = [navAll, navFunny, navAmazing, navTech, navNews, navVideos]
const closeFullDisplay = document.getElementById("close-full-display")


function userFormHTML(type) {
    return(`
    <div class="card-title">
        ${type}
    </div>
    <div class="card-body text-center">
        <form id="user-form">
        <div class="form-group">
            <label for="username">Username:</label><br>
            <input type="text" name="username" id="username">
        </div>
        <div class="form-group">
            <label for="password">Password:</label><br>
            <input type="password" name="password" id="password">
        </div>
        <input type="submit" class="btn btn-warning" value="${type}">
        </form>
    </div>
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
        <form id="submission-form" class="card-body">
            
            <div class="form-group">
            <label for="link">Title:</label><br>
            <input type="text" name="title" id="title" class="form-control">
            </div>

            <div class="form-group">
                <label for="link">Link:</label><br>
                <input type="text" name="link" id="link" class="form-control">
            </div>
            
            <div class="form-group"
                <label for="category">Category:</label><br>
                    <select class="form-control" id="category" name="category">
                    <option value="1">Funny</option>
                    <option value="2">Amazing</option>
                    <option value="3">Tech</option>
                    <option value="4">News</option>
                    <option value="5">Videos</option>
                </select>
            </div>

            <input type="submit" class="btn btn-warning" value="Submit">
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
        if (event.target.className === "submission-link text-dark") {
            const submissionId = event.target.parentElement.parentElement.id
            event.preventDefault();
            Submission.fullDisplay(submissionId);
        } else if (event.target.className === "upvote-link") {
            const submissionId = event.target.parentElement.id
            event.preventDefault();
            Submission.upvote(event, submissionId);
        }
    })
}

const navLinkEvents = function(){
    navLinks.forEach(link => {
        link.addEventListener ('click', function(event){
            event.preventDefault();
            const catId = event.target.id 
            Submission.loadSubmissions(catId)
        })
    })
}

closeFullDisplay.addEventListener('click', function(event) {
    hideModal();
})


