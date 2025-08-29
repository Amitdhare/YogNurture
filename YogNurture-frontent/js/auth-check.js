// auth.js
const API_BASE = "http://localhost:3000/api/auth-check/checking";

// ✅ Signup
async function signup(name, email, password) {
    try {
        const res = await fetch(`${API_BASE}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("✅ Signup successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert("❌ " + data.message);
        }
    } catch (err) {
        alert("Server error: " + err.message);
    }
}

// ✅ Login
async function login(email, password) {
    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            localStorage.setItem("token", data.token); // for future API requests
            window.location.href = "dashboard.html"; // protected page
        } else {
            alert("❌ " + data.message);
        }
    } catch (err) {
        alert("Server error: " + err.message);
    }
}

// ✅ Check if logged in
function checkLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login to access this page");
        window.location.href = "login.html";
    }
}

// ✅ Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    alert("You have been logged out");
    window.location.href = "login.html";
}

// ✅ Get token for protected requests
function getAuthToken() {
    return localStorage.getItem("token");
}

// ✅ Setup event listeners safely
document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (signupBtn) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            signup(name, email, password);
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            login(email, password);
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }
});


