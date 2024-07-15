import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './home.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <header className='header'>
                <div className='header-container'>
                    <img src={logo} alt="logo" className='logo' />
                    <div className='nav-container'>
                        <Link to="/auth/signin" className='login-button'>Login</Link>
                        <button id="toggle" className='toggle-button'>
                            <svg className="toggle-icon" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    {/* <ul id="collapseMenu" className='menu'>
                        <li className='menu-item'>
                            <button className='menu-link' onClick={() => { }}>Home</button>
                        </li>
                        <li className='menu-item'>
                            <button className='menu-link' onClick={() => { }}>Feature</button>
                        </li>
                        <li className='menu-item'>
                            <button className='menu-link' onClick={() => { }}>Blog</button>
                        </li>
                        <li className='menu-item'>
                            <button className='menu-link' onClick={() => { }}>About</button>
                        </li>
                    </ul> */}
                </div>
            </header>

            <div className="main-content">
                <div className="main-container">
                    <div className="content">
                        <h1 className="main-title">ESG Score Prediction with Sustex Corporate Model</h1>
                        <p className="main-description">Use our Sustex Corporate model to predict and assess the Environmental, Social, and Governance (ESG) score of your company. Receive accurate analyses and recommendations to enhance your ESG performance. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <div className="button-container">
                            <button className='start-button'>Get started today</button>
                        </div>
                    </div>
                    <hr className="divider" />
                    <div className="logo-grid">
                        <img src="https://readymadeui.com/google-logo.svg" className="logo-image" alt="google-logo" />
                        <img src="https://readymadeui.com/facebook-logo.svg" className="logo-image" alt="facebook-logo" />
                        <img src="https://readymadeui.com/linkedin-logo.svg" className="logo-image" alt="linkedin-logo" />
                        <img src="https://readymadeui.com/pinterest-logo.svg" className="logo-image" alt="pinterest-logo" />
                    </div>
                </div>
                <img src="https://readymadeui.com/bg-effect.svg" alt="" className="bg-effect" />
            </div>

            <div className="container">
                <div className="header">
                    <h2>Our Features</h2>
                    <p>Experience the power of our product with these key features.</p>
                </div>
                <div className="grid">
                    <div className="card">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 mr-6 bg-blue-50 p-3 rounded-md shrink-0" viewBox="0 0 32 32">
                            <path d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z" />
                            <path d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z" />
                        </svg>
                        <div>
                            <h3>Real-time Data</h3>
                            <p>Access real-time data from anywhere, enabling quick decision-making and responsiveness.</p>
                        </div>
                    </div>
                    <div className="card">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 mr-6 bg-blue-50 p-3 rounded-md shrink-0" viewBox="0 0 32 32">
                            <path d="M29.994 6.003c0-.003-.003-.003-.003-.006s0-.003-.003-.006l-11.98-11.98c-.103-.103-.237-.154-.36-.21-.09-.036-.18-.067-.273-.094-.12-.03-.24-.054-.363-.068A2.944 2.944 0 0 0 16.5 0C16.207 0 15.93.092 15.715.278c-.124.014-.242.04-.367.068a2.936 2.936 0 0 0-.273.094c-.124.056-.256.106-.372.182-.102.052-.199.127-.292.206l-.003.003-.006.003-11.98 11.98c-.04.04-.075.085-.113.128a.896.896 0 0 0-.218.606c0 .513.423.936.937.936.043 0 .087-.008.13-.015l2.358-.382 5.193 5.194v14.05c0 .516.42.937.937.937h7.958c.517 0 .938-.42.938-.937V13.478l5.193-5.194 2.358.382c.043.007.087.015.13.015a.936.936 0 0 0 .937-.936.895.895 0 0 0-.218-.606c-.038-.043-.072-.088-.113-.127l-.006-.004-.003-.003Zm-4.131-1.063a.937.937 0 0 0-.937.937v12.084H7.103V5.877a.937.937 0 0 0-.937-.937L3.726 5.72l9.59-9.59 9.587 9.587-2.348.38c-.207.033-.418.033-.623 0l-2.35-.38Zm4.682 16.996H6.366v-1.125l7.25-7.25c.113-.112.27-.176.436-.177.155.002.3.064.413.176l7.25 7.25v1.124Zm0 0" />
                            <path d="M22.294 24.275c-.102.102-.23.183-.36.248-.098.04-.202.067-.306.094-.136.037-.27.067-.41.087-.12.02-.238.037-.36.044a1.937 1.937 0 0 1-.613-.01c-.13-.027-.258-.057-.384-.1a3.898 3.898 0 0 0-.635-.132l-1.286-1.286c-.206-.205-.546-.205-.752 0l-1.284 1.286a3.939 3.939 0 0 0-.636.132 1.938 1.938 0 0 1-.383.1 1.939 1.939 0 0 1-.616.01 4.78 4.78 0 0 1-.37-.044c-.138-.02-.273-.05-.407-.087a2.44 2.44 0 0 0-.308-.094 1.91 1.91 0 0 1-.365-.248 1.932 1.932 0 0 1-.496-.799 1.935 1.935 0 0 1-.008-.95c.032-.118.064-.237.104-.352.04-.125.08-.244.128-.362.062-.156.135-.303.22-.447.088-.15.182-.293.29-.427.112-.142.238-.276.372-.4.144-.135.3-.254.464-.367.163-.114.337-.215.52-.308.187-.097.38-.178.58-.246.204-.07.414-.123.63-.16.123-.021.244-.045.368-.06a1.965 1.965 0 0 1 .441-.045 1.938 1.938 0 0 1 .491.063c.14.037.278.087.413.14.13.053.25.122.364.195.114.071.218.154.308.252.092.1.168.216.234.34.065.125.119.26.17.394.036.098.075.196.1.297.031.133.048.268.066.402.014.123.028.245.03.372a1.928 1.928 0 0 1-.139.757 1.93 1.93 0 0 1-.397.634Zm0 0" />
                            <path d="M13.994 17.065a2.941 2.941 0 0 0-2.94 2.94c0 .376.075.742.217 1.088l.027.061-6.304 6.304c-.1.1-.15.237-.174.375a.896.896 0 0 0-.02.157c0 .513.423.936.937.936.04 0 .08-.003.12-.008l2.466-.328c.1-.013.196-.055.284-.127l6.235-6.236.052.03a3.93 3.93 0 0 0 1.142.17c.528 0 .985-.332 1.164-.795l.03-.086c.036-.114.045-.23.051-.347l.006-.114-.005-.11a3.47 3.47 0 0 0-.132-.665l-.018-.055c-.076-.257-.195-.503-.35-.73l-.013-.021-.03-.035c-.072-.089-.149-.167-.235-.234l-.026-.016c-.151-.089-.315-.15-.485-.183l-.038-.007-.106-.013-1.348-.207a.94.94 0 0 0-.116-.007.937.937 0 0 0-.938.937c0 .048.004.097.01.144l.005.042.003.027-.002.054c0 .048.003.095.005.142l.002.05-.002.044c-.001.026-.002.052-.002.078 0 .057.006.114.015.171l.003.02c.013.08.032.157.057.234l.008.03c.046.148.108.291.187.424l.018.03.028.03c.075.076.158.14.248.194l.013.006.021.01 6.12 3.06c.056.028.115.048.173.067l.028.007c.142.033.286.058.43.078l.06.007c.158.018.314.027.472.027.09 0 .18-.003.268-.008l.145-.008.014-.002a3.926 3.926 0 0 0 2.59-1.07c.133-.131.254-.271.364-.418l.032-.041.006-.007c.006-.005.012-.01.018-.015a3.946 3.946 0 0 0 .967-2.641c0-.515-.421-.938-.936-.938-.04 0-.08.002-.12.007l-2.466.328c-.1.013-.196.055-.284.127l-6.22 6.22a.922.922 0 0 0-.052-.03 3.934 3.934 0 0 0-1.25-.19c-.545 0-1.027.35-1.196.865l-.03.086c-.035.112-.044.228-.05.343l-.005.108c0 .13.022.253.058.375l.018.062c.076.262.198.512.354.746l.008.013c.085.106.177.202.276.286l.017.013c.147.083.305.14.47.17l.014.003.05.006 1.348.207c.042.006.084.01.126.013a.94.94 0 0 0 .921-.766c.002-.007.002-.015.003-.023.001-.01.001-.02 0-.029l-.002-.02c-.002-.025-.004-.051-.007-.078l-.006-.041-.002-.026c-.002-.029-.003-.058-.006-.088l-.002-.027c-.01-.081-.023-.16-.045-.238l-.01-.031c-.055-.144-.132-.282-.223-.412l-.017-.03-.03-.03c-.075-.076-.158-.14-.248-.194l-.012-.006-.021-.01-6.104-3.052c-.014-.007-.03-.01-.045-.015a.938.938 0 0 0-.342-.07Zm0 0" />
                        </svg>
                        <div>
                            <h3>Scalability & Flexibility</h3>
                            <p>Scales up or down as your business grows, with adaptable solutions for evolving needs.</p>
                        </div>
                    </div>
                    <div className="card">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 mr-6 bg-blue-50 p-3 rounded-md shrink-0" viewBox="0 0 32 32">
                                <path d="M29.994 6.003c0-.003-.003-.003-.003-.006s0-.003-.003-.006l-11.98-11.98c-.103-.103-.237-.154-.36-.21-.09-.036-.18-.067-.273-.094-.12-.03-.24-.054-.363-.068A2.944 2.944 0 0 0 16.5 0C16.207 0 15.93.092 15.715.278c-.124.014-.242.04-.367.068a2.936 2.936 0 0 0-.273.094c-.124.056-.256.106-.372.182-.102.052-.199.127-.292.206l-.003.003-.006.003-11.98 11.98c-.04.04-.075.085-.113.128a.896.896 0 0 0-.218.606c0 .513.423.936.937.936.043 0 .087-.008.13-.015l2.358-.382 5.193 5.194v14.05c0 .516.42.937.937.937h7.958c.517 0 .938-.42.938-.937V13.478l5.193-5.194 2.358.382c.043.007.087.015.13.015a.936.936 0 0 0 .937-.936.895.895 0 0 0-.218-.606c-.038-.043-.072-.088-.113-.127l-.006-.004-.003-.003Zm-4.131-1.063a.937.937 0 0 0-.937.937v12.084H7.103V5.877a.937.937 0 0 0-.937-.937L3.726 5.72l9.59-9.59 9.587 9.587-2.348.38c-.207.033-.418.033-.623 0l-2.35-.38Zm4.682 16.996H6.366v-1.125l7.25-7.25c.113-.112.27-.176.436-.177.155.002.3.064.413.176l7.25 7.25v1.124Zm0 0" />
                                <path d="M22.294 24.275c-.102.102-.23.183-.36.248-.098.04-.202.067-.306.094-.136.037-.27.067-.41.087-.12.02-.238.037-.36.044a1.937 1.937 0 0 1-.613-.01c-.13-.027-.258-.057-.384-.1a3.898 3.898 0 0 0-.635-.132l-1.286-1.286c-.206-.205-.546-.205-.752 0l-1.284 1.286a3.939 3.939 0 0 0-.636.132 1.938 1.938 0 0 1-.383.1 1.939 1.939 0 0 1-.616.01 4.78 4.78 0 0 1-.37-.044c-.138-.02-.273-.05-.407-.087a2.44 2.44 0 0 0-.308-.094 1.91 1.91 0 0 1-.365-.248 1.932 1.932 0 0 1-.496-.799 1.935 1.935 0 0 1-.008-.95c.032-.118.064-.237.104-.352.04-.125.08-.244.128-.362.062-.156.135-.303.22-.447.088-.15.182-.293.29-.427.112-.142.238-.276.372-.4.144-.135.3-.254.464-.367.163-.114.337-.215.52-.308.187-.097.38-.178.58-.246.204-.07.414-.123.63-.16.123-.021.244-.045.368-.06a1.965 1.965 0 0 1 .441-.045 1.938 1.938 0 0 1 .491.063c.14.037.278.087.413.14.13.053.25.122.364.195.114.071.218.154.308.252.092.1.168.216.234.34.065.125.119.26.17.394.036.098.075.196.1.297.031.133.048.268.066.402.014.123.028.245.03.372a1.928 1.928 0 0 1-.139.757 1.93 1.93 0 0 1-.397.634Zm0 0" />
                                <path d="M13.994 17.065a2.941 2.941 0 0 0-2.94 2.94c0 .376.075.742.217 1.088l.027.061-6.304 6.304c-.1.1-.15.237-.174.375a.896.896 0 0 0-.02.157c0 .513.423.936.937.936.04 0 .08-.003.12-.008l2.466-.328c.1-.013.196-.055.284-.127l6.235-6.236.052.03a3.93 3.93 0 0 0 1.142.17c.528 0 .985-.332 1.164-.795l.03-.086c.036-.114.045-.23.051-.347l.006-.114-.005-.11a3.47 3.47 0 0 0-.132-.665l-.018-.055c-.076-.257-.195-.503-.35-.73l-.013-.021-.03-.035c-.072-.089-.149-.167-.235-.234l-.026-.016c-.151-.089-.315-.15-.485-.183l-.038-.007-.106-.013-1.348-.207a.94.94 0 0 0-.116-.007.937.937 0 0 0-.938.937c0 .048.004.097.01.144l.005.042.003.027-.002.054c0 .048.003.095.005.142l.002.05-.002.044c-.001.026-.002.052-.002.078 0 .057.006.114.015.171l.003.02c.013.08.032.157.057.234l.008.03c.046.148.108.291.187.424l.018.03.028.03c.075.076.158.14.248.194l.013.006.021.01 6.12 3.06c.056.028.115.048.173.067l.028.007c.142.033.286.058.43.078l.06.007c.158.018.314.027.472.027.09 0 .18-.003.268-.008l.145-.008.014-.002a3.926 3.926 0 0 0 2.59-1.07c.133-.131.254-.271.364-.418l.032-.041.006-.007c.006-.005.012-.01.018-.015a3.946 3.946 0 0 0 .967-2.641c0-.515-.421-.938-.936-.938-.04 0-.08.002-.12.007l-2.466.328c-.1.013-.196.055-.284.127l-6.22 6.22a.922.922 0 0 0-.052-.03 3.934 3.934 0 0 0-1.25-.19c-.545 0-1.027.35-1.196.865l-.03.086c-.035.112-.044.228-.05.343l-.005.108c0 .13.022.253.058.375l.018.062c.076.262.198.512.354.746l.008.013c.085.106.177.202.276.286l.017.013c.147.083.305.14.47.17l.014.003.05.006 1.348.207c.042.006.084.01.126.013a.94.94 0 0 0 .921-.766c.002-.007.002-.015.003-.023.001-.01.001-.02 0-.029l-.002-.02c-.002-.025-.004-.051-.007-.078l-.006-.041-.002-.026c-.002-.029-.003-.058-.006-.088l-.002-.027c-.01-.081-.023-.16-.045-.238l-.01-.031c-.055-.144-.132-.282-.223-.412l-.017-.03-.03-.03c-.075-.076-.158-.14-.248-.194l-.012-.006-.021-.01-6.104-3.052c-.014-.007-.03-.01-.045-.015a.938.938 0 0 0-.342-.07Zm0 0" />
                            </svg>
                        <div>
                            <h3>Scalability & Flexibility</h3>
                            <p>Scales up or down as your business grows, with adaptable solutions for evolving needs.</p>
                        </div>
                    </div>
                </div>
            </div>

            
            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-text">
                        &copy; 2024 ESG Predictions. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
