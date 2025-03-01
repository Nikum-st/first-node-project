const fs = require('fs/promises');
const chalk = require('chalk');
const Note = require('./models/note')

async function addNote(title) {
	await Note.create({title})
	console.log('Note was added!')
}
async function getNotes  () {
	return notes = await Note.find()
}

async function removeNote(id) {
	await Note.deleteOne({_id: id})
	console.log('Note was deleted!')
}

async function editNote(targetId,newTitle) {
	await Note.updateOne({_id: targetId},{title: newTitle})
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote
};
