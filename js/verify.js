// verify.js

// Delay in milliseconds before redirection
const delay = 1000; // 3 seconds

// URL to redirect to
const redirectUrl = `https://restorecord.com/verify/Yxu%20Sin's%20Community`;

// Function to redirect after a delay
function redirectToUrl() {
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, delay);
}

// Call the redirection function
redirectToUrl();