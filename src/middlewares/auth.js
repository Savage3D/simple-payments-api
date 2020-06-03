const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function auth(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.replace('Bearer ', '');

	if (!token) {
		return next(createError(401, 'You must be logged in'));
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userName = decoded.name;
		return next();
	} catch (error) {
		return next(createError(403, 'Permission denied'));
	}
}

module.exports = auth;
