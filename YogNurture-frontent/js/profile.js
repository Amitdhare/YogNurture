document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token"); 
  const form = document.getElementById("profileForm");
  const notLogged = document.getElementById("notLoggedIn");

  if (!token) {
    form.style.display = "none";
    notLogged.style.display = "block";
    return;
  }

  form.style.display = "block";
  notLogged.style.display = "none";

  // 🔹 Fetch existing profile
  try {
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const text = await res.text(); // raw text
    console.log("GET /api/profile response:", text);

    if (res.ok) {
      const profile = JSON.parse(text);
      // Fill form with existing data
      document.getElementById("name").value = profile.name || "";
      document.getElementById("age").value = profile.age || "";
      document.getElementById("gender").value = profile.gender || "";
      document.getElementById("weight").value = profile.weight || "";
      document.getElementById("lifestyle").value = profile.lifestyle || "";
      document.getElementById("medical_history").value = profile.medical_history || "";
    } else {
      console.warn("Profile fetch failed:", text);
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
  }

  // 🔹 Save/Update profile
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const profileData = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      weight: document.getElementById("weight").value,
      lifestyle: document.getElementById("lifestyle").value,
      medical_history: document.getElementById("medical_history").value
    };

    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const text = await res.text(); // raw text
      console.log("POST /api/profile response:", text);

      if (res.ok) {
        const data = JSON.parse(text);
        alert(data.message);
      } else {
        alert("Profile save failed: " + text);
      }
    } catch (err) {
      alert("Error saving profile: " + err.message);
    }
  });
});







