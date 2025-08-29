const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            alert("⚠️ Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("⚠️ Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("❌ Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, confirmPassword }) // ✅ include confirmPassword
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Signup successful! Please login.");
                window.location.href = "login.html";
            } else {
                alert("❌ " + (data.message || "Signup failed."));
            }
        } catch (err) {
            alert("🚨 Server error: " + err.message);
        }
    });
}



const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            alert("❌ Please enter both email and password");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Login successful!");
                localStorage.setItem("loggedInUser", JSON.stringify(data.user));
                localStorage.setItem("token", data.token); // for protected pages
                window.location.href = "getsolution.html"; // redirect to protected page
            } else {
                alert("❌ " + data.message);
            }
        } catch (err) {
            alert("Server error: " + err.message);
        }
    });
}

// Optional: Check if user is logged in
function checkLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login to access this page");
        window.location.href = "login.html";
    }
}






