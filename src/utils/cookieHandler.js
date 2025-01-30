export const setCookie = (key, value, days = 7) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${key}=${value}; expires=${expires}; path=/`;
};

export const getCookie = (key) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split("=");
        if (cookieKey === key) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
};
