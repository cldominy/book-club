$(document).ready(() => {
    $(".sidenav").sidenav();
    $(".dropdown-trigger").dropdown();
    $(".parallax").parallax();
    $.get("/api/user_data").then(data => {
        $(".memberName").text(data.username);
    });

    $.get("/api/reviews/latest").then(data => {
        for (let i = 0; i < data.length; i++) {
            $("#latestReviews").append(`<div class="col s12 m3">
            <div class="card small">
              <div class="card-content">
                <span class="card-title">${data[i].title}</span>
                <p class="authorStyle">By ${data[i].authorName}</p>
                <br>
                <p>"${data[i].review}"</p>
              </div>
              <div class="card-action">
                <a href="/profile/${data[i].UserId}">Reviewed by ${data[i].User.username}</a>
              </div>
            </div>
          </div>`);
        }
    });
});

