#!/usr/bin/env node

import addTask from "./commands/addTask.js";
import deleteTask from "./commands/deleteTask.js";
import readTask from "./commands/readTask.js";
import { Command } from "commander";
import updateTask from "./commands/updateTask.js";

const program = new Command();

program
  .name('todo')
  .description('Your terminal task manager!')
  .version('1.0.0')

program
  .name('add')
  .description('Create a new todo.')
  .action(addTask)

program
  .command('read')
  .description('Read all the todos.')
  .action(readTask)

program
  .command('delete')
  .description('Delete a todo.')
  .action(deleteTask)

program
  .command('update')
  .description('Update a todo.')
  .action(updateTask)

program.parse();