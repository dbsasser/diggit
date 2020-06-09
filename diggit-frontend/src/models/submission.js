class Submission {
    static all = []

    constructor ({id, link, title}) {

        this.id = id
        this.link = link
        this.title = title
        Submission.all.push(this)
    }

    htmlifySubmission() {
        return(` 
            <div class="submissionRow" id="${this.id}">
                <a href="${this.link}" class="submission-link">${this.title}</a>
            </div>
        `)
    }

    renderSubmission() {
        submissionList.innerHTML += this.htmlifySubmission()
    }

    static renderSubmissions() {
        submissionList.innerHTML = ""
        Submission.all.forEach(submission => submission.renderSubmission())
    }

    static loadSubmissions() {
        API.getSubmissions()
        .then (submissions => {
            submissions.forEach(submission => new Submission(submission))
            Submission.renderSubmissions()
        })
    }

    static fullDisplay(submissionId) {
        API.getSubmission(submissionId)
        .then (submission => {
            submissionModalTitle.innerHTML += `${submission.title}`
            submissionModalContent.innerHTML = `
                <iframe is="x-frame-bypass" src="${submission.link}" width="100%" height="100%"></iframe>
            `
        })
        submissionModal.style.display = "block";



        submissionModal.addEventListener('click', function(event){
            if (event.target === submissionModal) {
                hideModal();
            }
        })
    }

}