import { connectDB, disconnectDB } from "../db/connectDB.js";
import { getAskCode } from "../utils/utils.js";
import Todos from "../schema/TodoSchema.js";
import ora from 'ora';
import chalk from 'chalk';

const deleteTask = async () => {
  try {
    const { code } = await getAskCode();
    await connectDB();

    const spinner = ora("Finding and Deleting the todo ... ").start();
    const response = await Todos.deleteOne({ code: code });

    spinner.stop();

    if (response.deletedCount === 0) {
      console.log(chalk.redBright("Could not find any todo the provided name. Deletion failed."))
    } else {
      console.log(chalk.greenBright("Deleted Task Successfully"));
    }

    await disconnectDB();
  } catch (error) {
    console.log(`Something went wrong, Error: ${error}`);
    process.exit(1);
  }
}

export default deleteTask;