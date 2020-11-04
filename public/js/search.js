$(document).ready(() => {
    $("#submitSearch").on("click", () => {
        const title = $("#searchBook").val().replace("%20", "+");
        $("#results").empty("");
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
                $("#results").append(`<li class="list-group-item">
            <div class="row searchRows">
                <div class="col-sm-1 text-center">
                     
                    <img class="img-fluid" src="${results[i].volumeInfo.imageLinks.thumbnail}" onerror="this.onerror=null; this.src='images/default.png'" /> 
    
                    <div class="row">
                    <div class="col-12 col-sm-12 text-center">
                    <br>
                    <button type="button" class="btn btn-primary btn-sm" id="writeReview${i}">
                    Write a Review
                  </button>
                    </div>
                  </div>
                </div>
                <div class="col-sm-11">
               <h3>${results[i].volumeInfo.title}</h3>
              <h4>By ${results[i].volumeInfo.authors}</h4>
                  <p>${results[i].volumeInfo.description}</p>
                </div>
            </div>
            
            
                  <form>
                    <div class="form-group signupBox" id="hiddenForm${i}" style="display: none;">
                      <textarea class="form-control" placeholder="Write your review here" id="bookReview${i}"></textarea>
                      <br>
                      <button type="button" class="btn btn-primary float-right" id="submitReview${i}" data-bookTitle="${results[i].volumeInfo.title}" data-authorName="${results[i].volumeInfo.authors}">Submit</button>
                    </div>
                  </form>
        </li>`);

                // eslint-disable-next-line
                $(document).on("click", `#writeReview${i}`, function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(`#hiddenForm${i}`).toggle();
                });

                // eslint-disable-next-line
              $(document).on("click", `#submitReview${i}`, function (event) {
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

    function logReview(title, authorName, review) {
        $.post("/api/reviews", {
            title:title,
            authorName:authorName,
            review:review,
        })
            .then(() => {
                alert("Review Successfully Added!");
                window.location.replace("/profile");
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