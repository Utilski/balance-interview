class ServerError extends Error {
    httpStatus
    constructor(httpStatus, err) {
        super(`${httpStatus}: ${err}`)
        this.httpStatus = httpStatus;
        this.err = err;
    }
}

module.exports = ServerError;