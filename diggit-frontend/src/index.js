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
        modalContent.innerHTML = "Form Placeholder"

        modal.addEventListener('click', function(event){
            if (event.target === modal) {
                modal.style.display ="none";
            }
        })
    })
}