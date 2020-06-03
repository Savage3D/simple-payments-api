function errors(err, req, res, next) {
	if (process.env.NODE_ENV === 'production') {
		if (err.statusCode >= 500) {
			res.status(err.statusCode).send();
		}
		res.status(err.statusCode).send(err.message);
	}
	console.log(err.stack);
	res.status(err.statusCode).send(err.message);
}

module.exports = errors;
