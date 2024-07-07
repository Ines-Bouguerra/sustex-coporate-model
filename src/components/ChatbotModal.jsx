// ChatbotModal.js
import React, { useState } from 'react';

const ChatbotModal = ({ isOpen, onClose, messages, onSendMessage }) => {

    const [showTyping, setShowTyping] = useState(false);
    const [input, setInput] = useState('');

    const handleSend = () => {
        onSendMessage(input);
        setInput('');
    }

    console.log(messages);
    console.log(input);
    

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
                <form onSubmit={handleSend} className="message-form">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSend();
                        }}
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatbotModal;
