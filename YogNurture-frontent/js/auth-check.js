// auth.js

const API_BASE = "http://localhost:5000/api"; // backend base URL

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
            alert("Signup successful! Please login.");
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
            // backend se JWT token ya user info le lo
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            localStorage.setItem("token", data.token); // future API requests
            window.location.href = "dashboard.html"; // ya koi protected page
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

// ✅ Optional: helper to get token for protected requests
function getAuthToken() {
    return localStorage.getItem("token");
}

