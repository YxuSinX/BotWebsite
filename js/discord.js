const delay = 1000;
const redirectUrl = `https://discord.gg/hUQqG3hHG2`;

function redirectToUrl() {
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, delay);
}

redirectToUrl();