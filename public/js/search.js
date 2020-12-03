$(document).ready(() => {
    $("#submitSearch").on("click", () => {
        const title = $("#searchBook").val().replace("%20", "+");
        $("#searchResults").empty("");
        $(".modalContainer").empty("");
        $.ajax({
            url: "/api/search/" + title,
            method: "GET"
        }).then((results) => {
            for (let i = 0; i < results.length; i++) {
                if (results[i].volumeInfo.description === undefined) {
                    results[i].volumeInfo.description = "Sorry, no description is available for this title.";
                }
                if (results[i].volumeInfo.imageLinks === undefined) {
                    results[i].volumeInfo.imageLinks = "";
                }
                $("#searchResults").append(` <div class="col s12 m6">
                <div class="card small horizontal">
                  <div class="card-image">
                  <img class="thumbnail-img" src="${results[i].volumeInfo.imageLinks.thumbnail}" onerror="this.onerror=null; this.src='images/default.png'" />
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                    <p class="card-title grey-text text-darken-4 ">${results[i].volumeInfo.title}</p>
                    <p class="scroll-box"><span class="authorStyle">By ${results[i].volumeInfo.authors}</span>
                    <br>
                    ${results[i].volumeInfo.description}</p>
                    </div>
                    <div class="card-action searchAction">
                    <a class="modal-trigger" href="#modal-${i}">Write a Review</a>
                    </div>
                  </div>
                </div>
              </div>`);

                $(".modalContainer").append(`<div id="modal-${i}" class="modal">
                    <div class="modal-content">
                        <h4>Write Your Review!</h4>
                        <div class="row">
                        <form class="col s12">   
                            <div class="row">
                            <div class="input-field col s12">
                                <textarea id="bookReview${i}" type="text" class="materialize-textarea validate" placeholder="Write your review here"></textarea>
                            </div>
                            </div>             
                        </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="waves-effect waves-green btn-flat" id="submitReview${i}" data-bookTitle="${results[i].volumeInfo.title}" data-authorName="${results[i].volumeInfo.authors}">Submit</button>
                    </div>
                    </div>`);
                $(".modal").modal();

                $(document).on("click", `#submitReview${i}`, function (event) {
                    console.log("yes");
                    event.preventDefault();
                    event.stopPropagation();
                    const button = $(this);
                    const bookTitle = button.attr("data-bookTitle");
                    const authorName = button.attr("data-authorName");
                    const bookReview = $("#bookReview" + i);
                    const reviewData = {
                        title: bookTitle,
                        authorName: authorName,
                        review: bookReview.val(),
                        name: (""),
                    };
                    if (
                        !reviewData.title ||
                        !reviewData.authorName ||
                        !reviewData.review
                    ) {
                        console.log("Error! Something went wrong");
                    }
                    logReview(
                        reviewData.title,
                        reviewData.authorName,
                        reviewData.review
                    );
                });
            }
        });
    });

    function logReview(title, authorName, review, name) {
        $.post("/api/reviews", {
            title:title,
            authorName:authorName,
            review:review,
            name:name
        })
            .then(() => {
                alert("Review Successfully Added!");
                window.location.replace("/browse");
            })
            .catch(handleReviewErrors);
    }

    function handleReviewErrors(err) {
        let message;
        if (
            err &&
            err.responseJSON &&
            err.responseJSON.errors &&
            err.responseJSON.errors[0]
        ) {
            message = err.responseJSON.errors[0].message;
        } else {
            message = "An unknown error occurred; please try again later";
        }
        console.warn(`Review Form error; message: ${message}`);
        $("#alert .msg").text(message);
        $("#alert").fadeIn(500);
    }
});