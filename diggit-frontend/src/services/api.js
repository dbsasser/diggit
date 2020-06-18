class API {
    static postSubmission() {
        fetch('http://localhost:3000/api/v1/submissions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                submission: {
                    title: document.getElementById('title').value,
                    link: document.getElementById('link').value,
                    category_id: document.getElementById('category').value
                }
            })
        })
        .then(r => r.json())
        .then(result => {
            if (result.message) {
                modalContent.prepend(result.message)
            } else {
                let newSubmission = new Submission(result);
                newSubmission.renderSubmission();
                hideModal();
            }

        })
        // .then(Submission.loadSubmissions())
        .catch(error => {
            console.log(error)
        })
    }

    static getSubmissions(cat="all"){
        if (cat === "all") {
            return(
                fetch('http://localhost:3000/api/v1/submissions')
                .then(r => r.json())
            )
        } else {
            return(
                fetch('http://localhost:3000/api/v1/categories/' + `${cat}` + '/submissions')
                .then(r => r.json())
            )
        }
    }

    static logIn() {
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
                    localStorage.setItem('token', result.jwt)
                    userBox.innerHTML = `${result.user.username}`;
                    hideModal();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    static signUp() {
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
                    localStorage.setItem('token', result.jwt)
                    userBox.innerHTML = `${result.user.username}`;
                    hideModal();
                }

                
            })
            .catch(error => {
                console.log(error)
            })
    }

    static getSubmission(submissionId) {
        return(
            fetch('http://localhost:3000/api/v1/submissions' + `/${submissionId}`)
            .then(r => r.json())
        )
    }

    static postUpvote(submissionId) {
        return(
            fetch('http://localhost:3000/api/v1/upvotes', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    submission: {
                        submission_id: parseInt(`${submissionId}`, 10)
                    }
                })
            })
            .then(r => r.json())
        )
    }
}