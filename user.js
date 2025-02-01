document.addEventListener("DOMContentLoaded", function () {

    // SIGNUP FUNCTION
    let signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("signupUsername").value.trim();
            let email = document.getElementById("signupEmail").value.trim();
            let password = document.getElementById("signupPassword").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let userExists = users.some(user => user.username === username);

            if (userExists) {
                alert("Username already exists! Choose another.");
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            // Store logged-in user & redirect to home page
            localStorage.setItem("loggedInUser", username);
            alert("Signup successful! Redirecting to home.");
            window.location.href = "home page.html";
        });
    }

    // LOGIN FUNCTION
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let loginUsername = document.getElementById("loginUsername").value.trim();
            let loginPassword = document.getElementById("loginPassword").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            let validUser = users.find(user => user.username === loginUsername && user.password === loginPassword);

            let loginError = document.getElementById("loginError");
            loginError.textContent = ""; // Clear previous error messages

            if (validUser) {
                localStorage.setItem("loggedInUser", loginUsername);
                alert("Login successful!");
                window.location.href = "home page.html";
            } else {
                loginError.textContent = "Invalid username or password!";
            }
        });
    }

    // LOGOUT FUNCTION (In home.html)
    let logoutButton = document.getElementById("logoutBtn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            alert("Logging out...");
            window.location.href = "login.html";
        });
    }

    // CHECK LOGIN STATUS (Prevent unauthorized access)
    if (window.location.pathname.includes("home page.html")) {
        let loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("You must log in first!");
            window.location.href = "login.html";
        }
    }
});
