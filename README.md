# MCP Filesystem Operations

A simple MCP server and client application that allows users to perform filesystem operations on a specified folder.

## Features

- Create, edit, and delete files
- Upload folders
- Interactive prompt-based editing
- Simple web-based frontend

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd MCP-BASICS
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Upload a folder using the upload button
2. Use the prompt box to specify file operations:
   - Create: `create [filename]`
   - Edit: `edit [filename]`
   - Delete: `delete [filename]`

## Project Structure

```
MCP-BASICS/
├── server/
│   ├── index.js
│   └── mcp-server.js
├── client/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── package.json
```

## License

MIT
#   M C P - B A S I C S  
 