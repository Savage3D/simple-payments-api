const { getDb } = require('./db');

const usersCollection = 'users';

async function create(name, balance = 0, payments = []) {
	const result = await getDb()
		.collection(usersCollection)
		.insertOne({ name, balance, payments });
	return result.ops[0];
}

async function findAll() {
	const users = await getDb()
		.collection(usersCollection)
		.find()
		.toArray();
	return users;
}

async function findByName(name) {
	const user = await getDb()
		.collection(usersCollection)
		.findOne({ name });
	return user;
}

async function update(name, newBalance, newPayment) {
	const query = { name };
	const updateObj = {
		$set: { balance: newBalance },
		$push: { payments: newPayment },
	};
	const options = { upsert: false };

	await getDb()
		.collection(usersCollection)
		.findOneAndUpdate(query, updateObj, options);
}

async function remove(name) {
	await getDb()
		.collection(usersCollection)
		.findOneAndDelete({ name });
}

module.exports = {
	create,
	findAll,
	findByName,
	update,
	remove,
};
