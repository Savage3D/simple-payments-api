const { Router } = require('express');
const createError = require('http-errors');
const { escape } = require('validator');
const jwt = require('jsonwebtoken');
const usersService = require('../services/users');
const paymentService = require('../services/payment');
const auth = require('../middlewares/auth');
const { checkName, compareNames, checkAmount } = require('../services/validators');

const router = Router();
const badReqErrorMsg = 'Check request data';

router.post('/login', async (req, res, next) => {
	try {
		const name = escape(req.body.name);
		if (!checkName(name)) {
			return next(createError(400, badReqErrorMsg));
		}

		let user = await usersService.findByName(name);
		if (!user) {
			user = await usersService.create(name);
		}

		const token = jwt.sign({ name }, process.env.JWT_KEY);

		return res.status(200).send({ user, token });
	} catch (error) {
		return next(createError(500, error.message, { stack: error.stack }));
	}
});

router.get('/', async (req, res, next) => {
	try {
		const users = await usersService.findAll();
		res.status(200).send(users);
	} catch (error) {
		next(createError(500, error.message, { stack: error.stack }));
	}
});

router.post('/makepayment', auth, async (req, res, next) => {
	try {
		const from = escape(req.userName);
		const to = escape(req.body.to);
		const amount = escape(req.body.amount);

		if (!checkName(from) || !checkName(to) || !compareNames(from, to) || !checkAmount(amount)) {
			return next(createError(400, badReqErrorMsg));
		}

		const updatedUser = await paymentService.makePayment(from, to, amount);
		return res.status(200).send(updatedUser);
	} catch (error) {
		return next(createError(500, error.message, { stack: error.stack }));
	}
});

module.exports = router;
