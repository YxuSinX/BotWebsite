const delay = 1000;
const redirectUrl = `https://discord.gg/yxu`;

function redirectToUrl() {
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, delay);
}

redirectToUrl();