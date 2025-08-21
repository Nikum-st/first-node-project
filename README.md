## Notes CLI and Programmatic API Documentation

### Overview
This repository provides a simple notes manager with:
- **CLI commands** powered by `yargs` in `index.js`
- **Programmatic API** functions in `notes.controller.js`

Notes are stored locally in `db.json` as an array of objects with the shape `{ title: string, id: number }`.

### Requirements
- Node.js 16+ (recommended 18+)

### Installation
```bash
npm install
```

### Quick Start
```bash
# Add a note
node index.js add --title "Buy milk"

# List notes
node index.js list

# Remove a note by id
node index.js remove --id 1740223173376
```

---

## CLI Reference
All commands are invoked via:
```bash
node index.js <command> [options]
```

### add
- **description**: Add a new note
- **options**:
  - `--title <string>` (required): The note title

Examples:
```bash
node index.js add --title "Read a book"
```

### list
- **description**: Print all notes from `db.json`
- **options**: none

Examples:
```bash
node index.js list
# Output example:
# Here is the list of notes:
# 1740223173376 Hello
# 1740223207255 My
```

### remove
- **description**: Remove a note by its numeric `id`
- **options**:
  - `--id <number>` (required): The note id to remove

Examples:
```bash
node index.js remove --id 1740223173376
```

---

## Programmatic API
The following functions are exported from `notes.controller.js`:

```js
const { addNote, getNotes, removeNote } = require('./notes.controller');
```

### addNote(title)
- **signature**: `async function addNote(title: string): Promise<void>`
- **description**: Appends a new note to the in-memory notes array and writes the updated array to `db.json`.
- **parameters**:
  - `title`: The note title.
- **side effects**: Writes to `./db.json`.
- **example**:
```js
await addNote('Schedule dentist appointment');
```

### getNotes()
- **signature**: `function getNotes(): void`
- **description**: Logs a formatted list of notes to stdout using `chalk`.
- **returns**: `void` (prints to console)
- **example**:
```js
getNotes();
// Prints:
// Here is the list of notes:
// 1740223173376 Hello
// 1740223207255 My
```

### removeNote(targetId)
- **signature**: `async function removeNote(targetId: number): Promise<void>`
- **description**: Filters out the note with id `targetId` and writes the updated array to `db.json`.
- **parameters**:
  - `targetId`: Numeric id of the note to remove.
- **side effects**: Writes to `./db.json`.
- **example**:
```js
await removeNote(1740223173376);
```

---

## Data Model
`db.json` is an array of note objects. Example:
```json
[
  { "title": "Hello", "id": 1740223173376 },
  { "title": "My", "id": 1740223207255 }
]
```

---

## Usage Notes and Behavior
- **One-process scope**: Notes are read once at process start via `require('./db.json')`. Each CLI invocation is a new Node process, so changes written to `db.json` are visible in subsequent commands.
- **Console output**: `getNotes()` prints to the console and does not return data. If you need structured data, you can `require('./db.json')` directly or adapt the function.
- **Storage location**: All data is stored in `./db.json` relative to the project root.

---

## Examples
Programmatic usage in a script `demo.js`:
```js
const { addNote, getNotes, removeNote } = require('./notes.controller');

async function run() {
  await addNote('Walk the dog');
  getNotes();
  // Use a real id from your db.json
  // await removeNote(1740223173376);
}

run().catch(console.error);
```

Run it:
```bash
node demo.js
```

---

## Troubleshooting
- **Write permissions**: Ensure the process can write to `db.json`.
- **Invalid id**: `remove` requires a numeric `--id` that exists in `db.json`.

