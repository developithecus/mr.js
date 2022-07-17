class Container {
    services = {};

    add(key, service) {
        this.services[key] = service;
    }

    has(key) {
        return !!this.services[key];
    }

    get(key) {
        return this.services[key];
    }

    remove(key) {
        delete this.services[key];
    }
}

export default Container;