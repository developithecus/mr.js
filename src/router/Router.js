import fs from "fs";
import path from "path";
import HttpException from "../exception/HttpException";
import Controller from "./entity/Controller";
import Exception from "../exception/Exception";
import ExpressWrapper from "./ExpressWrapper";
import di from "../di";
import MemStorage from "../services/MemStorage";

class Router {
    static key = "router";
    _application = null;
    controllers = {};

    constructor() {
        console.log("[Mr. JS] Initializing router...");
        this._application = new ExpressWrapper();
    }

    getApplication() {
        return this._application;
    }

    defineRoute(method, path, handler) {
        this._application.getApplication()[method.toLowerCase()](path, async (request, response) => {
            try {
                const returnedObject = await handler.controller[handler.action].call(handler.controller, {
                    request: request,
                    response: response,
                    ...request.params
                });
                if (returnedObject) {
                    response.send(returnedObject);
                }
            } catch (ex) {
                if (ex instanceof HttpException) {
                    response.statusCode = ex.statusCode;
                    response.send(JSON.stringify(ex));
                } else throw ex;
            }
        });
    }

    prepareRoutes() {
        console.log("[Router] Creating routes map...");
        const config = di().get(MemStorage.key).retrieve("application.configuration");
        di().get(MemStorage.key).retrieve("application.modules").forEach(module => {
            this.controllers[module.name] = [];
            const modulePath = module.getModulePath();
            const controllerDir = path.resolve(modulePath, config.router.controller_directory);
            try {
                fs.readdirSync(controllerDir).map(controllerFile => controllerFile.replace(/\.jsx?/i, "")).forEach(controller => {
                    const controllerInstance = require(path.resolve(controllerDir, controller)).default();
                    if (!(controllerInstance instanceof Controller)) {
                        throw new Exception(`Class "${controllerInstance.constructor.name}" is not a controller. It must extend the Controller class.`);
                    } else {
                        this.controllers[module.name].push(controllerInstance);
                    }
                });
            } catch(ex) {
                throw ex;
            }
        });
    }
}

export default Router;