import path from "path";
import di from "./di";
import Router from "./router/Router";
import MemStorage from "./services/MemStorage";
import PersistentManager from "./persistence/PersistentManager";

class MrJS {
    configuration = null;

    constructor(configuration) {
        this.configuration = configuration;
        di().get(MemStorage.key).store("application.configuration", configuration);
    }

    getConfig(key) {
        return this.configuration[key];
    }

    loadModules() {
        console.log("[Mr. JS] Initializing modules...");
        const modules = [];
        const moduleDir = path.resolve(this.getConfig('project_root'), this.getConfig('modules_dir'));
        const requiredModules = require(moduleDir).default;
        Object.keys(requiredModules).forEach(name => {
            modules.push(requiredModules[name]);
            requiredModules[name].registerServices();
        });

        di().get(MemStorage.key).store("application.modules", modules || []);
    }

    launch(port) {
        return di().get(PersistentManager.key).connect().then(() => {
            di().get(Router.key).getApplication().listen(port, () => {
                console.log(`[Mr. JS] Listening on port ${port}...`);
            });
        });
    }
}

export default (configuration) => {
    const instance = new MrJS(configuration);
    instance.loadModules();
    di().get(Router.key).getApplication().setStaticDirectory(configuration.static_dir);
    di().get(Router.key).prepareRoutes();
    return instance;
}