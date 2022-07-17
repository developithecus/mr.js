import empty from "../polyfill/empty";

class MemStorage {
    static key = "Framework::MemStorage";
    storage = {};

    store(key, data) {
        const paths = key.split(".");
        let tempValue = this.storage;

        for (let index in paths) {
            const path = paths[index];
            if (empty(tempValue[path])) {
                if (index != paths.length - 1) {
                    tempValue[path] = {};
                } else {
                    tempValue[path] = data;
                }
            }
            tempValue = tempValue[path];
        }

        return this;
    }

    retrieve(key) {
        return this.storage.nested(key);
    }

    remove(key) {
        delete this.storage[key.split(".")[0]];
        return this;
    }
}

export default MemStorage;