var nconf = require('nconf'),
	path = require('path');

nconf
	.env()
	.file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;