const delay = 1000;
const URLs = `https://discord.com/oauth2/authorize?client_id=1110091771985272852&permissions=8&scope=bot`;

function redirectToUrl() {
    setTimeout(() => {
        window.location.href = URLs;
    }, delay);
}

redirectToUrl();