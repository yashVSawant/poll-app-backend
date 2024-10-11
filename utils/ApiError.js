class ApiError extends Error {
    constructor(message,statusCode){
        super(message); // sending message to Error Class
        this.statusCode = statusCode; // adding statuscode ti this
        
        Error.captureStackTrace(this,this.constructor) // pushing error in stack for tracing error
    }
}

module.exports = ApiError;