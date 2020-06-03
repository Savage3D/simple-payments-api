const validator = require('validator');

function checkName(name) {
	return validator.isAlphanumeric(name)
		&& name.length >= 3
		&& name.length <= 30;
}

function compareNames(ownerName, agentName) {
	return ownerName !== agentName;
}

function checkAmount(amount) {
	return validator.isDecimal(amount, { decimal_digits: '0,2' }) && amount > 0;
}

module.exports = {
	checkName,
	compareNames,
	checkAmount,
};
