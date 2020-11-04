$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const emailInput = $("#emailInput");
    const usernameInput = $("#usernameInput");
    const passwordInput = $("#passwordInput");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password || !userData.username) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData.email, userData.password, userData.username);
        emailInput.val("");
        usernameInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, username) {
        $.post("/api/signup", {
            email: email,
            username: username,
            password: password
        }).then(() => {
            window.location.replace("/members");
        }).catch(handleSignupErrors); // If there's an error, handle it by throwing up a bootstrap alert
    }

    function handleSignupErrors(err) {
        let message;
        if (err && err.responseJSON && err.responseJSON.errors && err.responseJSON.errors[0]) {
            message = err.responseJSON.errors[0].message;
        } else {
            message = "An unknown error occurred; please try again later";
        }
        console.warn(`Signup Form error; message: ${message}`);
        $("#alert .msg").text(message);
        $("#alert").fadeIn(500);
    }
});
