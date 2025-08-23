form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const issue = document.getElementById("healthIssue").value.toLowerCase().trim();

  try {
    const res = await fetch("http://localhost:5000/api/form/getsolution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue })
    });

    const data = await res.json();

    if (data.link) {
      result.innerHTML = `
        <p>We found a solution for your issue:</p>
        <a href="${data.link}" class="btn">View Solution Page</a>
      `;
    } else {
      result.innerHTML = `<p>Sorry, no solution found for: <strong>${issue}</strong></p>`;
    }
  } catch (err) {
    console.error(err);
    result.innerHTML = `<p style="color:red;">⚠ Server error, try again later</p>`;
  }
});


  