// auth.js

// Check if logged in
function checkLogin() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        alert("Please login to access this page");
        window.location.href = "login.html";
    }
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out");
    window.location.href = "login.html";
}
