const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
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
    });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const email = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Login successful!");
                localStorage.setItem("loggedInUser", email); // store session
                window.location.href = "getsolution.html";   // redirect
            } else {
                alert("❌ " + data.message);
            }
        } catch (err) {
            alert("Server error: " + err.message);
        }
    });
}






