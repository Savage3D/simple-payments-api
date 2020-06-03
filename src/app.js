const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const { initDb } = require('./services/db');
const usersRoutes = require('./routes/users');
const errors = require('./middlewares/errors');

async function main() {
	await initDb();

	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/api/users', usersRoutes);
	app.use(errors);

	app.listen(PORT);
}

main();
