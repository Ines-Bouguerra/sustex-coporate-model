// ChatbotModal.js
import React, { useState } from 'react';

const ChatbotModal = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', body: 'Hello! How can I assist you today?', beingTyped: false },
        { role: 'user', body: 'I have a question about my ESG score.', beingTyped: false }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [showTyping, setShowTyping] = useState(false);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // Add user message to state
        setMessages([...messages, { role: 'user', body: newMessage, beingTyped: false }]);
        setNewMessage('');

        // Simulate typing and response
        setShowTyping(true);
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                { role: 'assistant', body: 'Here is the information you requested.', beingTyped: false }
            ]);
            setShowTyping(false);
        }, 2000);
    };

    return (
        <div className="chatbot-modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-content">
                {/* Chat messages */}
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            {message.body}
                            {message.beingTyped && (
                                <span className="typing-indicator">...</span>
                            )}
                        </div>
                    ))}
                    {showTyping && <div className="message assistant">Typing...</div>}
                </div>

                {/* Input form */}
                <form onSubmit={sendMessage} className="message-form">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatbotModal;
