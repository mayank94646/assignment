/** Common Methods */

export function debounceMethod(method, delay) {
    let timerId = null;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(method.bind(this, ...args), delay);
    }
}

export function getLocalStorage(key) {
    return localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}