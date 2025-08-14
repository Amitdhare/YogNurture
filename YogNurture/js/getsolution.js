const form = document.getElementById("solutionForm");
const result = document.getElementById("solutionResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const issue = document.getElementById("healthIssue").value.toLowerCase().trim();
  let solutionLink = "";

  if (issue.includes("navel") || issue.includes("nabhi")) {
    solutionLink = "solution/nabhi.html";
  } else if (issue.includes("back pain")) {
    solutionLink = "solution/backpain.html";
  } else if (issue.includes("stress") || issue.includes("anxiety")) {
    solutionLink = "solution/stress.html";
  } else if (issue.includes("weight")) {
    solutionLink = "solution/weight.html";
  } else {
    result.innerHTML = `<p>Sorry, we don't have a solution yet for: <strong>${issue}</strong></p>`;
    return;
  }

  result.innerHTML = `
    <p>We found a solution for your issue:</p>
    <a href="${solutionLink}" class="btn">View Solution Page</a>
  `;
});

  