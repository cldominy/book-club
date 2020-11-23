$(document).ready(() => {
    $(".sidenav").sidenav();
    $(".dropdown-trigger").dropdown();
    $(".parallax").parallax();
    $.get("/api/user_data").then(data => {
        $(".memberName").text(data.username);
    });
});

