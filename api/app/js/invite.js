// invite

// Delay in milliseconds before redirection
const delay = 1000; // 3 seconds

// URL to redirect to
const redirectUrl = `https://discord.com/oauth2/authorize?client_id=1110091771985272852&permissions=8&scope=bot`;

// Function to redirect after a delay
function redirectToUrl() {
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, delay);
}

// Call the redirection function
redirectToUrl();