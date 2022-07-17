import Exception from "./Exception";

class HttpException extends Exception {
    statusCode = 400;

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    getStatusCode() {
        return this.statusCode;
    }
}

export default HttpException;