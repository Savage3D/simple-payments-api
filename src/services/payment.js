const usersService = require('./users');

async function makePayment(from, to, amount) {
	let fromUser = await usersService.findByName(from);
	let toUser = await usersService.findByName(to);
	if (!fromUser) return null;

	const amountFl = parseFloat(amount);

	await usersService
		.update(from, +fromUser.balance - amountFl, { agent: to, value: -amountFl });

	if (!toUser) {
		toUser = await usersService
			.create(to, amountFl, [{ agent: from, value: amountFl }]);
	} else {
		await usersService
			.update(to, +toUser.balance + amountFl, { agent: from, value: amountFl });
	}
	fromUser = await usersService.findByName(from);
	return fromUser;
}

module.exports = { makePayment };
