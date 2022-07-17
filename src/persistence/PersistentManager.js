import di from "../di";
import MemStorage from "../services/MemStorage";
import empty from "../polyfill/empty";
import Exception from "../exception/Exception";

class PersistentManager {
    static key = "orm";
    configuration = {};
    connections = {};

    connect() {
        console.log("[ORM] Initializing persistent manager...");
        this.configuration = di().get(MemStorage.key).retrieve("application.configuration");
        console.log(`[ORM] Found ${Object.keys(this.configuration.persistence.connections).length} connection(s).`);
        const prm = Object.keys(this.configuration.persistence.connections).map(async (key) => {
            const connectionDetails = this.configuration.persistence.connections[key];
            const adapter = require("./adapters").default[this.configuration.persistence.driver];
            if (empty(adapter)) {
                throw new Exception(`Driver ${this.configuration.persistence.driver} not found.`);
            } else {
                this.connections[key] = new adapter(Object.assign({ name: key }, connectionDetails));
                return this.connections[key].init();
            }
        });

        return Promise.all(prm);
    }
}

export default PersistentManager;