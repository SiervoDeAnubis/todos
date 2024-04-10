import inquirer from 'inquirer';

const { prompt } = inquirer

const getAskCode = async () => {
  try {
    const question = await prompt([{
      name: 'code', message: 'Enter the code name: ', type: 'input'
    }]);

    question.code = question.code.trim();

    return question;
  } catch (error) {
    console.log(`Something went wrong \n ${error}`)
    process.exit(1);
  }
}

const updateQuestion = async (todo) => {
  try {
    const update = prompt([
      { name: 'name', message: 'Update the name? ', type: 'input', default: todo.name },
      { name: 'detail', message: 'Update the Description? ', type: 'input', default: todo.detail },
      { name: 'status', message: 'Update the Status', type: 'list', choices: ['pending', 'completed'], default: todo.status }
    ]);

    return update;
  } catch (error) {
    console.log(`Something went wrong ... \n ${error}`);
    process.exit(1);
  }
}

export {
  getAskCode,
  updateQuestion
}