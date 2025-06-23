let ws;

// Initialize WebSocket connection
function initWebSocket() {
    const port = window.location.port === '' ? '3001' : window.location.port;
    ws = new WebSocket(`ws://${window.location.hostname}:${port}`);

    ws.onopen = () => {
        console.log('Connected to server');
    };

    ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        displayResponse(response);
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
        setTimeout(initWebSocket, 1000); // Reconnect after 1 second
    };
}

// Send command to server
function sendCommand() {
    const command = document.getElementById('commandInput').value.trim();
    if (command) {
        ws.send(command);
        document.getElementById('commandInput').value = '';
    }
}

// Display server response
function displayResponse(response) {
    const responseArea = document.getElementById('responseArea');
    const responseDiv = document.createElement('div');
    responseDiv.className = `response ${response.success ? 'success' : 'error'}`;
    responseDiv.textContent = response.message;
    responseArea.appendChild(responseDiv);
    responseArea.scrollTop = responseArea.scrollHeight;
}

// Handle folder upload
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        displayResponse(result);
    } catch (error) {
        displayResponse({ success: false, message: 'Error uploading folder' });
    }
});

// Initialize WebSocket connection when page loads
document.addEventListener('DOMContentLoaded', initWebSocket);
