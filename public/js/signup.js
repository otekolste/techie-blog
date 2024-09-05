const signupFormHandler = async (event) => {
  event.preventDefault();
  // Get username and password from form
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    // If both fields have been filled, make POST request to create a new user
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/"); // On success, redirect to homepage
    } else {
      alert("Failed to sign up.");
    }
  }
};

document // Attach event listener to signup button
  .querySelector("#signUpButton")
  .addEventListener("click", signupFormHandler);
