import di from "../../../di";
import { MongoClient } from 'mongodb';
import MongoConnection from "./MongoConnection";

class MongoAdapter {
    static driver = 'mongo';
    parameters = null;

    constructor(parameters) {
        this.parameters = parameters;
    }

    async init() {
        const url = `mongodb://${this.parameters.host}:${this.parameters.port}`;
        return MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
            console.log(`Successfully connected to "mongo.${this.parameters.name}".`);
            const db = client.db(this.parameters.db_name);
            const connection = new MongoConnection(db);
            di().registerInstance("mongo." + this.parameters.name, connection);
        });
    }
}

export default MongoAdapter;