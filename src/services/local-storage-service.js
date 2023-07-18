
const setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

const getItemFromLocalStorage = (key) => {
    return localStorage.getItem(key);
} 

const removeItemFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export {
    setItemToLocalStorage,
    getItemFromLocalStorage,
    removeItemFromLocalStorage
}