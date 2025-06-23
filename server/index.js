const express = require('express');
const multer = require('multer');
const WebSocket = require('ws');
const path = require('path');
const MCPFileSystem = require('./mcp-server.js');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Initialize MCP filesystem
const mcp = new MCPFileSystem();

// Configure multer for file uploads
const upload = multer({
    dest: path.join(__dirname, '..', 'uploads'),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'client')));

// File upload endpoint
app.post('/upload', upload.single('folder'), (req, res) => {
    res.json({ message: 'Folder uploaded successfully' });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        try {
            const response = await mcp.processCommand(message.toString());
            ws.send(JSON.stringify(response));
        } catch (error) {
            ws.send(JSON.stringify({ success: false, message: error.message }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
