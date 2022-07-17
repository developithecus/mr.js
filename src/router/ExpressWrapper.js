import express from "express";
import bodyParser from "body-parser";

class ExpressWrapper {
    application = null;

    constructor() {
        this.application = express();
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use(bodyParser.json());
    }

    getApplication() {
        return this.application;
    }

    setStaticDirectory(dir) {
        this.application.use(express.static(dir));
    }

    listen(...params) {
        this.application.listen(...params);
    }
}

export default ExpressWrapper;