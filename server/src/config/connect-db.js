const mongoose = require('mongoose');
const chalk = require('chalk');
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log(chalk.green('Database connected'));
	} catch (error) {
		console.log(chalk.red(error));
		process.exit(1);
	}
};

module.exports = connectDB;
