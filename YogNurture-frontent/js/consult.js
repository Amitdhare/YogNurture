
document.getElementById("expertForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("http://localhost:3000/api/expert/consult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    document.getElementById("formResponse").innerText = data.message;
  } catch (err) {
    document.getElementById("formResponse").innerText = "Something went wrong!";
  }
});

