/**
 * Callback function to generate custom json response for the errors
 * @param {*} res - response to be provided from the server side
 * @param {*} statusCode - Status code of the error
 * @param {*} errorMessage - String message for the error response
 * @returns JSON response and error status code with custom message
 */
exports.customErrorMessage = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({
        ERROR: errorMessage.toUpperCase(),
    });
};