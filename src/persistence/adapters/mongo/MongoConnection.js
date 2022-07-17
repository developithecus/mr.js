class MongoConnection {
    connection = null;

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return this.connection;
    }
}

export default MongoConnection;