const chatMessages = document.getElementById('chat-messages');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username = '';

function addMessage(user, message, save = true) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="username">${user}:</span> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (save) {
        // Save to localStorage
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push({ user, message });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
}

function loadMessages() {
    chatMessages.innerHTML = ''; // Clear existing messages
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(msg => addMessage(msg.user, msg.message, false));
}

sendButton.addEventListener('click', () => {
    if (!username) {
        username = usernameInput.value.trim();
        if (username) {
            usernameInput.style.display = 'none';
            messageInput.style.display = 'block';
            sendButton.textContent = 'Send';
            addMessage('System', `${username} has joined the chat`);
        }
    } else {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(username, message);
            messageInput.value = '';
        }
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Load messages when the page loads
loadMessages();

// Listen for storage events to update in real-time across tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'chatMessages') {
        loadMessages();
    }
});