const delay = 1000;
const redirectUrl = `https://restorecord.com/verify/Yxu%20Sin's%20Community`;

function redirectToUrl() {
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, delay);
}

redirectToUrl();