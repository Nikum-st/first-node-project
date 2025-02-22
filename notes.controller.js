const fs = require('fs/promises');
const notes = require('./db.json');
const chalk = require('chalk');

async function addNote(title) {
	const note = {
		title,
		id: Date.now(),
		toString,
	};

	notes.push(note);

	await fs.writeFile('./db.json', JSON.stringify(notes));
}
function getNotes() {
	console.log(chalk.bgGreen('Here is the list of notes:'));
	notes.forEach((note) => {
		console.log(`${note.id} ${note.title}`);
	});
}

async function removeNote(targetId) {
	const updatedNotes = notes.filter((note) => note.id !== targetId)
	await fs.writeFile('./db.json', JSON.stringify(updatedNotes));
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
};
