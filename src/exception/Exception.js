class Exception {
    message = null;

    constructor(message) {
        this.message = message;
    }

    getMessage() {
        return this.message;
    }

    toString() {
        return this.message;
    }
}

export default Exception;