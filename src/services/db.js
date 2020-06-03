const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URI, { useUnifiedTopology: true });
let db = null;

async function initDb() {
	try {
		if (db) throw Error('DB is already connected');
		await client.connect();
		db = client.db('test-task-dev');
	} catch (error) {
		throw Error(`DB connection failed\n${error.stack}`);
	}
}

function getDb() {
	if (!db) throw Error('You must connect DB before use it');
	return db;
}

module.exports = { initDb, getDb };
