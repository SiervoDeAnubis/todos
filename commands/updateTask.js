import { connectDB, disconnectDB } from "../db/connectDB.js";
import { getAskCode, updateQuestion } from "../utils/utils.js";
import Todos from "../schema/TodoSchema.js";
import ora from 'ora';
import chalk from 'chalk';

const updateTask = async () => {
  try {
    const { code } = await getAskCode();

    await connectDB();

    const spinner = ora("Finding the todo ... ").start();

    const todo = await Todos.findOne({ code: code });

    spinner.stop();

    if (!todo) {
      console.log(chalk.redBright('Could not find a Todo with the code you provided.'));
    } else {
      console.log(chalk.blueBright('Type the update properties. Press Enter if you do not want to update the data.'));

      const update = await updateQuestion(todo);

      if (update.status === 'completed') {
        spinner.text = 'Deleting the todo ...'
        spinner.start();

        await Todos.deleteOne({ _id: todo._id });

        spinner.stop();
        console.log(chalk.greenBright('Deleted the todo.'));
      } else {
        spinner.text = 'Updating the todo ... ';
        spinner.start();
        await Todos.updateOne({ _id: todo._id }, update, { runValidators: true });
        spinner.stop();
        console.log(chalk.greenBright('Updated the todo.'));
      }
    }

    await disconnectDB();

  } catch (error) {
    console.log(`Something went wrong \n ${error}`);
    process.exit(1);
  }
}

export default updateTask;