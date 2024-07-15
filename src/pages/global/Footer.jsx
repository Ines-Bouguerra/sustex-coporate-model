import React from 'react'

const Footer = () => {
    // add footer fixed on the bottom of the page

    return (
        <footer style={{
            textAlign: 'center', padding: '10px 0', backgroundColor: 'rgb(31, 42, 64) !important', marginTop: 'auto', position: 'fixed', bottom: '0', zIndex: '1000', width: '100%',
            color: 'white', backgroundColor: 'rgb(31, 42, 64)', justifyContent: 'center', display: 'flex', alignItems: 'center', marginLeft: '-250px'
        }}>
            &copy; 2024 ESG Predictions. All rights reserved.
        </footer>
    );
}

export default Footer