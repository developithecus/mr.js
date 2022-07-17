import Container from "./entity/Container";
import Exception from "../exception/Exception";
import MemStorage from "../services/MemStorage";

let instance = null;

class DependencyInjection {
    container = null;
    holdList = null;

    constructor() {
        this.container = new Container();
        this.holdList = new Container();
    }

    register(service, params = {}) {
        if (this.container[service.key]) {
            throw new Exception(`Looks like service "${service.key}" has already been registered.`);
        } else {
            let dependencies = [];

            if (service.dependencies) {
                dependencies = this.registerServiceDependencies(service);
            }

            this.container.add(service.key, new service(...dependencies, params));
        }

        return this;
    }

    getConfiguration(key) {
        return this.get(MemStorage.key).retrieve("application.configuration" + (key ? (`.${key}`) : ''));
    }

    getDefaultConnection() {
        return this.get(this.getConfiguration('persistence.driver') + '.main').getConnection();
    }

    registerInstance(key, instance) {
        if (this.container[key]) {
            throw new Exception(`Looks like service "${key}" has already been registered.`);
        } else {
            this.container.add(key, instance);
        }

        return this;
    }

    registerServiceDependencies(service) {
        const dependencyArray = [];
        service.dependencies.forEach(key => {
            if (!this.holdList.has(key) && !this.container.has(key)) {
                throw new Exception(`Unknown service "${key}". Are you sure you registered it in your module class?`);
            }
            this.holdList.has(key) && this.register(this.holdList.get(key));
            this.container.has(key) && dependencyArray.push(this.container.get(key));
        });

        return dependencyArray;
    }

    hold(service) {
        this.holdList.add(service.key, service);
    }

    get(key) {
        if (!this.container.has(key)) {
            throw new Exception(`Unknown service "${key}". Are you sure you registered it in your module class?`);
        }

        return this.container.get(key);
    }
}

export default () => instance ? instance : instance = new DependencyInjection();