const WebSocket = require('ws');
const fs = require('fs').promises;
const path = require('path');

class MCPFileSystem {
    constructor() {
        this.workingDir = path.join(__dirname, '..', 'uploads');
        this.initializeDirectory();
    }

    async initializeDirectory() {
        try {
            await fs.mkdir(this.workingDir, { recursive: true });
        } catch (error) {
            console.error('Error initializing directory:', error);
        }
    }

    async createFile(filename, content = '') {
        const filePath = path.join(this.workingDir, filename);
        try {
            await fs.writeFile(filePath, content);
            return { success: true, message: 'File created successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async editFile(filename, content) {
        const filePath = path.join(this.workingDir, filename);
        try {
            await fs.writeFile(filePath, content);
            return { success: true, message: 'File edited successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async deleteFile(filename) {
        const filePath = path.join(this.workingDir, filename);
        try {
            await fs.unlink(filePath);
            return { success: true, message: 'File deleted successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async readDirectory() {
        try {
            const files = await fs.readdir(this.workingDir);
            return { success: true, files };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async processCommand(command) {
        const [action, ...params] = command.split(' ');
        const filename = params[0];
        
        switch (action.toLowerCase()) {
            case 'create':
                return this.createFile(filename);
            case 'edit':
                return this.editFile(filename, params.slice(1).join(' '));
            case 'delete':
                return this.deleteFile(filename);
            case 'list':
                return this.readDirectory();
            default:
                return { success: false, message: 'Unknown command' };
        }
    }
}

module.exports = MCPFileSystem;
