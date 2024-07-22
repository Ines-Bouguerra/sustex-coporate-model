import React, { useState, useEffect } from 'react';

const ChatbotModal = ({ isOpen, onClose, messages, onSendMessage }) => {
    const [showTyping, setShowTyping] = useState(false);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        onSendMessage(input);
        setInput('');
        setShowTyping(false);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setShowTyping(true);
    };

    // Optional: Automatically hide typing indicator after a few seconds of inactivity
    useEffect(() => {
        if (showTyping) {
            const timer = setTimeout(() => {
                setShowTyping(false);
            }, 2000); // 2 seconds timeout

            return () => clearTimeout(timer);
        }
    }, [showTyping]);

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

                <form onSubmit={handleSend} className="message-form">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSend(e);
                        }}
                        className="message-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatbotModal;
