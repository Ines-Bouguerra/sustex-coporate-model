import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../components/auth/SignupForm'

const SignUpView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <SignUpForm />
            <div className="mt-8 text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in here</Link>
            </div>
        </div>
    );
}

export default SignUpView;