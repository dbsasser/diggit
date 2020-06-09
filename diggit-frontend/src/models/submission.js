class Submission {
    static all = []

    constructor ({id, link}) {
        this.id = id
        this.link = link
        Submission.all.push(this)
    }

    htmlifySubmission() {
        return(` 
            <div class="submissionRow">
                <a href="${this.link}" class="submission-link">${this.link}</a>
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

}