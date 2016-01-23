var http = require('http'),
    util = require('util');

function HttpError(status, message){
    Error.apply(this, arguments);
    this.status = status || 500;
    this.message = message || http.STATUS_CODES[this.status] || "Error";
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;
