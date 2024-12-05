// DOM Elements
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const themeToggle = document.getElementById("themeToggle");

// Dark Mode Setup
let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || false;

// Apply Theme on Load
function applyTheme() {
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "Light Mode";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "Dark Mode";
    }
}

// Add Message to Chat
function addMessage(message, sender = "user") {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Simulate Bot Response
function botResponse(userMessage) {
    const responses = [
        "Hello! How can I help you?",
        "I'm here to chat with you!",
        "Tell me more about that.",
        "That's interesting!",
        "Can you explain further?"
    ];
    // Prevent repeating responses
    let botReply;
    do {
        botReply = responses[Math.floor(Math.random() * responses.length)];
    } while (
        chatBox.lastChild &&
        chatBox.lastChild.textContent === botReply
    );

    setTimeout(() => addMessage(botReply, "bot"), 1000); // Simulate delay
}

// Send Message
function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    chatInput.value = ""; // Clear input field

    // Simulate Bot Response
    botResponse(userMessage);
}

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    applyTheme();
});

// Event Listeners
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Initialize
applyTheme();
