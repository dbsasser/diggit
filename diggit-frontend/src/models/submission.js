class Submission {
    static all = []

    constructor ({id, link, title, upvotes, user:username, category:name}) {

        this.id = id
        this.link = link
        this.title = title
        this.upvoteCount = upvotes.length
        this.user = username
        this.category = name

        Submission.all.push(this)
    }

    htmlifySubmission() {
        return(` 
            <div class="card my-2 w-100" id="${this.id}">
                <div class="card-block mt-3 mx-3">
                    <div class="row">
                        <div class="col-2">
                            <div class="upvote-div text-center">
                                <figure>
                                <a href="#" id="${this.id}"><img src="img/upvote-arrow.png" class="upvote-link"></a>
                                <figcaption><span class="vote-count">${this.upvoteCount}</span></figcaption>
                                </figure>
                            </div>
                        </div>
                        <div class="col-10" id="${this.id}">
                                <a href="${this.link}" class="submission-link">${this.title}</a><br>
                                <small>Posted by <strong>${this.user.username}</strong> in <strong>${this.category.name}</strong>
                        </div>
                    </div>
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
        .then(function(response) {
            if (!response.error) {
                Submission.addOneToUpvoteCountDisplay(event)
            }
        })
        .then(
            event.target.src="img/upvote-arrow-active.png"
        )
    }

}