const yargs = require('yargs');
const { addNote, getNotes, removeNote } = require('./notes.controller');
const chalk = require('chalk');

yargs.command({
	command: 'add',
	describe: 'Add new note to list',
	builder: {
		title: {
			type: 'string',
			description: 'Node title',
			demandOption: true,
		},
	},
	handler: async ({ title }) => {
		await addNote(title);
		console.log(chalk.green('Add command:', title));
	},
});

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	handler: async () => {
		await getNotes();
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	builder: {
		id: {
			type: 'number',
			description: 'Node id',
			demandOption: true,
		},
	},
	handler: async ({ id }) => {
		await removeNote(id);
		console.log(chalk.green('Note removed successfully!'));
	},
});

yargs.parse();
