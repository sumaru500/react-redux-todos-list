// in-house local storage layer, work on js types 
// ~ OOP : 
//      storageKey => private attribute
//      store => private attribute
//      return an object  equivalent to this 
const createStorage = storageKey => {
    // init storage
    const store = JSON.parse(localStorage.getItem(storageKey)) ?? {}; // ?? null or undefined
    // private function to save storage
    function save() {
        localStorage.setItem(storageKey, JSON.stringify(store));
    }

    // return all accessible functions for storage
    return {
        get(key) {
            return store[key];
        },
        set(key, value) {
            store[key] = value;
            save();
        },
        remove(key) {
            delete store[key];
            save();
        }
    };
}

export default createStorage;