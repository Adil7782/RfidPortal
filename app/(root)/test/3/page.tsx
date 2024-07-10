"use client"

import React, { useState, useRef, useEffect } from 'react';

const TestPage2 = () => {
    const [scannedData, setScannedData] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bufferRef = useRef('');  // Used to buffer the input
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Ensure the input field is focused when the component mounts
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Handle the case where 'Enter' is pressed, which we do not want to include in our data
            event.preventDefault();  // Prevent any default 'Enter' behavior
            if (timeoutRef.current) clearTimeout(timeoutRef.current);  // Clear any existing timeout

            setScannedData(bufferRef.current);
            console.log("Scanned QR Code:", bufferRef.current);
            bufferRef.current = '';  // Reset the buffer
            if (inputRef.current) {
                inputRef.current.value = '';  // Safely clear the input field
            }
            return;  // Exit the function early
        }

        // Add non-Enter keys to the buffer
        bufferRef.current += event.key;

        // Set a timeout to process the input after a brief pause
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setScannedData(bufferRef.current);
            console.log("Scanned QR Code:", bufferRef.current);
            bufferRef.current = '';  // Reset the buffer
            if (inputRef.current) {
                inputRef.current.value = '';  // Safely clear the input field
            }
        }, 50);  // Short delay after the last keypress to finalize input
    };

    return (
        <div>
            <input 
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyPress}
                style={{ opacity: 0.0, position: 'absolute', top: '-1000px' }}
                aria-hidden="true"
            />
            <p>Scanned Data: {scannedData}</p>
            <button onClick={() => inputRef.current?.focus()}>Focus to Scan</button>
        </div>
    );
}

export default TestPage2