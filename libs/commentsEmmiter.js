var emmiter = require('events');
var e = new emmiter();
console.log('create emmiter: %j', e);

module.exports = e;