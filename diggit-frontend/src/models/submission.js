class Submission {
    static all = []

    constructor ({id, link, title, upvotes}) {
        this.id = id
        this.link = link
        this.title = title
        this.upvoteCount = upvotes.length
        Submission.all.push(this)
    }

    htmlifySubmission() {
        return(` 
            <div class="submissionRow pure-g" id="${this.id}">
                <div class="pure-u-1-5 upvote-div" >
                    <a href="#"><img src="img/upvote-arrow.png" class="upvote-link"></a><span class="vote-count">${this.upvoteCount}</span></a>
                </div>
                <div class="pure-u-4-5">
                    <a href="${this.link}" class="submission-link">${this.title}</a>
                </div>
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

    static addOneToUpvoteCountDisplay(event) {
        const voteCount = event.target.parentElement.parentElement.querySelector(".vote-count")
        let voteCountNumber = parseInt(voteCount.innerText, 10)
        voteCountNumber ++
        voteCount.innerText = voteCountNumber
    }

    static fullDisplay(submissionId) {
        API.getSubmission(submissionId)
        .then (submission => {
            submissionModalTitle.innerHTML = `${submission.title}`
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

    static upvote(event, submissionId) {
        API.postUpvote(submissionId)
        .then(
            event.target.src="img/upvote-arrow-active.png"
        )
        .then(
            Submission.addOneToUpvoteCountDisplay(event)
        )
    }

}