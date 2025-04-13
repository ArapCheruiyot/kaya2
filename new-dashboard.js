const auth = firebase.auth();

// On auth state change
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('user-name').textContent = user.displayName || "User";
    renderFunddrive();
  } else {
    window.location.href = "auth.html";
  }
});

// Handle funddrive form submission
document.getElementById('funddrive-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const fundData = {
    title: document.getElementById('title').value,
    method: document.getElementById('method').value,
    detail: document.getElementById('detail').value,
    target: document.getElementById('target').value,
    description: document.getElementById('description').value,
    timestamp: new Date().toISOString()
  };

  localStorage.setItem("fundData", JSON.stringify(fundData));
  renderFunddrive();
  this.reset(); // Clear form
});

// Render funddrive card
function renderFunddrive() {
  const fundData = JSON.parse(localStorage.getItem("fundData"));
  const container = document.getElementById("funddrive-card-container");
  container.innerHTML = ""; // Clear previous content

  if (fundData) {
    const card = document.createElement("div");
    card.className = "funddrive-card";
    card.innerHTML = `
      <h3>${fundData.title}</h3>
      <p><strong>Target:</strong> KES ${fundData.target}</p>
      <p><strong>Method:</strong> ${fundData.method}</p>
      <p><strong>Detail:</strong> ${fundData.detail}</p>
      <p>${fundData.description}</p>
      <small>Created on ${new Date(fundData.timestamp).toLocaleString()}</small>
    `;
    container.appendChild(card);
  } else {
    container.innerHTML = "<p>No funddrive created yet.</p>";
  }
}
