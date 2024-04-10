import mongoose from 'mongoose';
import ora from 'ora';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const spinner = ora("Connecting to the database ...").start();
    await mongoose.connect("mongodb://127.0.0.1:27017/gob_test");
    spinner.stop();
    console.log(chalk.greenBright("Successfully connected to database!!!"));
  } catch (error) {
    console.log(chalk.redBright(`Error: ${error}`));
    process.exit(1);
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log(chalk.greenBright("Disconnected from the database."));
  } catch (error) {
    console.log(chalk.redBright(`Error: ${error}`));
    process.exit(1);
  }
}

export {
  connectDB,
  disconnectDB
}