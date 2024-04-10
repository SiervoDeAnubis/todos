import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

const { prompt } = inquirer;

const input = async () => {
  const answers = await prompt([
    { name: 'name', message: 'Enter name of the task: ', type: 'input' },
    { name: 'detail', message: 'Enter the details of the task: ', type: 'input' }
  ])

  return answers;
}

const askQuestions = async () => {
  const todoArray = [];
  let loop = false;

  do {
    const userAnswers = await input();
    todoArray.push(userAnswers);
    const { confirm } = await prompt([{
      name: 'confirm', message: 'Do you want to add more task?', type: 'confirm'
    }]);

    if (confirm) {
      loop = true;
    } else {
      loop = false;
    }

  } while (loop);

  return todoArray;
}

const addTask = async () => {
  try {
    const userResponse = await askQuestions();
    await connectDB()
    let spinner = ora('Creating the todos ... ').start();

    for (let i = 0; i < userResponse.length; i++) {
      const response = userResponse[i];
      await Todos.create(response);
    }

    spinner.stop();
    console.log(
      chalk.greenBright('Creating the todos!')
    )
    await disconnectDB();
  } catch (error) {
    console.log(`Something went wrong, Error: ${error}`);
    process.exit(1);
  }
}

export default addTask;