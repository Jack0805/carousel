'use client'
import React from 'react';
import './error.css'

interface ErrorProps {
    errorMessage: string
}
const Error = ({errorMessage}: ErrorProps) => {
    return (
        <div className="error-container">
            <p className='bold-header'>{errorMessage}</p>
        </div>
    );
};

export default Error;