const express = require('express');
const chalk = require('chalk');
const connectDB = require('./src/config/connect-db');
const dotenv = require('dotenv');
const authRouter = require('./src/routes/auth');
const requestRouter = require('./src/routes/requests');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./src/middleware/authMiddleware');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);

app.use('/api/auth', authRouter);
app.use('/api/requests', requestRouter);

const PORT = process.env.PORT || 3000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(chalk.green(`Listening on port ${PORT}`));
		});
	})
	.catch((error) => {
		console.log(chalk.red(error));
		process.exit(1);
	});
