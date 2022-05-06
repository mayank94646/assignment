export const fetchUsers = () => {
    return fetch(process.env.REACT_APP_USER_URL)
        .then((response) => response.json());
}