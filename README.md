# Notes CLI

A minimal Node.js command-line tool to manage a list of notes stored in a local JSON file (`db.json`). It supports adding notes, listing all notes, and removing notes by id.

## Quick start

- Prerequisites: Node.js 14+ (Node 18+ recommended)
- Install dependencies:

```bash
npm install
```

- Run a command (from the project root):

```bash
node index.js list
node index.js add --title "My first note"
node index.js remove --id 1740223173376
```

The data file lives at `./db.json` (relative to the project root) and contains an array of notes.

## CLI reference

### add
- **Description**: Add a new note
- **Usage**:

```bash
node index.js add --title "Note title"
```

- **Options**:
  - **--title**: string, required. The note text/title to store.

- **Output**:
  - Prints a confirmation like: `Add command: Note title` (in green)

### list
- **Description**: Print all notes
- **Usage**:

```bash
node index.js list
```

- **Output**:
  - A header and one line per note in the format: `<id> <title>`

Example:

```text
Here is the list of notes:
1740223173376 Hello
1740223207255 My
```

### remove
- **Description**: Remove a note by id
- **Usage**:

```bash
node index.js remove --id 1740223173376
```

- **Options**:
  - **--id**: number, required. The exact id of the note to remove.

- **Output**:
  - Prints a confirmation: `Note removed successfully!` (in green)

## Programmatic API

The CLI is built on top of functions exported from `notes.controller.js`. You can import and use them directly in Node.js.

```js
const { addNote, getNotes, removeNote } = require('./notes.controller');

(async () => {
	await addNote('Read docs');
	getNotes(); // logs the list to stdout
	// Suppose you captured an id from the list output
	await removeNote(1740223173376);
})();
```

### `addNote(title: string): Promise<void>`
- **Purpose**: Appends a new note to `db.json` with an auto-generated numeric id (`Date.now()`).
- **Arguments**:
  - **title**: string. Required. The note text/title.
- **Behavior**: Mutates the in-memory `notes` array for the current process and persists the full array back to `db.json`.
- **Errors**: Rejects on filesystem write errors.

### `getNotes(): void`
- **Purpose**: Logs all notes to stdout (primarily for CLI usage).
- **Returns**: `void`
- **Notes**: This function prints formatted text using `chalk`. It does not return the array. For programmatic reading, read and parse `db.json`.

### `removeNote(id: number): Promise<void>`
- **Purpose**: Removes a note with a matching id from `db.json`.
- **Arguments**:
  - **id**: number. Required.
- **Behavior**: Writes the filtered list back to `db.json`.
- **Errors**: Rejects on filesystem write errors.

## Data model

`db.json` is a JSON array. Each item has:

```json
{
  "title": "Hello",
  "id": 1740223173376
}
```

- **title**: string — free-form note text
- **id**: number — generated from `Date.now()` when the note is created

## Notes and caveats
- **Concurrency**: This tool is not safe for concurrent writes. Avoid running multiple commands simultaneously.
- **Id generation**: Uses `Date.now()`. Collisions are unlikely but theoretically possible if created in the same millisecond.
- **Working directory**: File paths are relative to the project root. Run commands from the project root.
- **Output formatting**: Uses `chalk` for colored output.

## Development
- Format code with Prettier:

```bash
npx prettier --write .
```

## License
ISC