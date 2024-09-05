const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get username and password from document
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    // If both fields have been filled, make POST request to log in with username and password
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); // Redirect user to homepage on success
    } else {
      alert("Failed to log in.");
    }
  }
};

document //Attach event handler to login button
  .querySelector("#loginButton")
  .addEventListener("click", loginFormHandler);
