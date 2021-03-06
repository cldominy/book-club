$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $("form.login");
    const emailInput = $("input#email");
    const passwordInput = $("input#password");


    $.ajax({
        url: "/api/user_data",
        method: "GET"
    }).then((data) => {
        if (data !== "Unathorized"){
            $(".logintab").hide();
            $(".profiletab").removeClass("hide");
        }
    });

    $(".logouttab").on("click", event => {
        event.preventDefault();
        $.ajax({
            url: "/api/logout",
            method: "GET"
        }).then(() => {
            $(".logintab").show();
            $(".profiletab").addClass("hide");
            window.location.replace("/about");
        });

    });
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
      

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(() => {
            window.location.replace("/profile");
            // If there's an error, log the error
        }).catch(err => {
            const message = err.responseText;
            console.warn(`Login Form error; message: ${message}`);
            $("#alert .msg").text(message);
            $("#alert").fadeIn(500);
        });
    }
});
