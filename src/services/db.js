const { MongoClient } = require('mongodb');
const { DB_URI, DB_NAME } = require('../config');

const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
let db = null;

async function initDb() {
	try {
		if (db) throw Error('DB is already connected');
		await client.connect();
		db = client.db(DB_NAME);
	} catch (error) {
		console.log(`DB connection failed\n${error.stack}`);
	}
}

function getDb() {
	if (!db) throw Error('You must connect DB before use it');
	return db;
}

module.exports = { initDb, getDb };
