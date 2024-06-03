import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const LoginView = () => {
    return (
        <div className="font-[sans-serif] text-[#333]">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginView;