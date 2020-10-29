$(document).ready(() => {
    const bookForm = $("form.review");
    const bookTitle = $("#book-title");
    const AuthorFirstName = $("#author-first");
    const AuthorLastName = $("#author-last");
    const bookReview = $("#book-review");

    bookForm.on("submit", event => {
        event.preventDefault();
        const reviewData = {
            title: bookTitle.val(),
            firstname: AuthorFirstName.val(),
            lastname: AuthorLastName.val(),
            review: bookReview.val()
        };
        if (!reviewData.title || !reviewData.firstname || !reviewData.lastname || !reviewData.review) {
            return
        }
        logReview(reviewData.title, reviewData.firstname, reviewData.lastname, reviewData.review);
        bookTitle.val("");
        AuthorFirstName.val("");
        AuthorLastName.val("");
        bookReview.val("");
    });

    function logReview(title, firstname, lastname, review) {
        $.post("/api/reviews", {
            title: title,
            firstname: firstname,
            lastname: lastname,
            review: review
        }).then(() => {
            window.location.replace("/display");
        }).catch(handleReviewErrors)
    }

    function handleReviewErrors(err) {
        let message;
        if (err && err.responseJSON && err.responseJSON.errors && err.responseJSON.errors[0]) {
            message = err.responseJSON.errors[0].message;
        } else {
            message = "An unknown error occurred; please try again later";
        }
        console.warn(`Review Form error; message: ${message}`);
        $("#alert .msg").text(message);
        $("#alert").fadeIn(500);
    }

});