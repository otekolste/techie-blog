// THE FOLLOWING CODE IS BASED OFF OF EXAMPLE CODE PROVIDED BY edX

const logout = async () => {
  // Make POST request to log out
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/"); // Redirect user to home page on successful logout
  } else {
    alert("Failed to log out.");
  }
};

document.querySelector("#logout").addEventListener("click", logout); // Attach event listener to logout button
