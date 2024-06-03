import { useTheme } from '@mui/material';
import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const backgroundColor = isDarkMode ? '#2a2d64' : '#e1e2fe';
    const textColor = isDarkMode ? '#e1e2fe' : '#2a2d64';
    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-card" onClick={toggleAnswer} style={{ backgroundColor, color: textColor }}>
            <div className="question">{question}</div>
            {isOpen && <div className="answer">{answer}</div>}
        </div>
    );
};

const ESGFAQ = () => {
    const faqs = [
        {
            question: "What does ESG stand for?",
            answer: "ESG stands for Environmental, Social, and Governance. It represents a set of criteria used to assess a company's performance and impact in these areas."
        },
        {
            question: "Why is ESG important?",
            answer: "ESG factors are increasingly important for investors, stakeholders, and society at large. They can affect a company's reputation, risk profile, and long-term financial performance."
        },
        {
            question: "How can a company improve its ESG performance?",
            answer: "Companies can improve their ESG performance by implementing sustainable practices, fostering diversity and inclusion, ensuring transparency and accountability in governance, and engaging with stakeholders."
        },
        {
            question: "What are some examples of ESG initiatives?",
            answer: "ESG initiatives can include reducing carbon emissions, promoting renewable energy, implementing fair labor practices, supporting local communities, and adopting ethical business standards."
        },
        {
            question: "How can investors integrate ESG into their decision-making process?",
            answer: "Investors can integrate ESG factors by analyzing company reports, ratings, and disclosures, engaging with company management on ESG issues, and investing in ESG-focused funds or portfolios."
        },
        // Add more FAQ items as needed
    ];

    return (
        <div className="faq-container">
            <h2>Sustex Coporate FAQ</h2>
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    );
};

export default ESGFAQ;
