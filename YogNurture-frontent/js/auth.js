const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        localStorage.setItem("user_" + email, password);
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    });
}


// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Email ko username ki jagah use karein
    const email = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    // LocalStorage se password fetch karein
    const storedPassword = localStorage.getItem("user_" + email);

    if (storedPassword && storedPassword === password) {
      localStorage.setItem("loggedInUser", email); // Login status store
      alert("Login successful!");
      window.location.href = "getsolution.html"; // Redirect after login
    } else {
      alert("Invalid email or password");
    }
  });
}






