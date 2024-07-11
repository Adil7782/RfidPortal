"use client"

import React, { useState, useRef, useEffect } from 'react';

const TestPage2 = () => {
    const [scannedData, setScannedData] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // When 'Enter' is pressed, consider the scan complete
            event.preventDefault();  // Prevent the default 'Enter' action
            const scannedValue = event.currentTarget.value.trim();
            setScannedData(scannedValue);
            console.log("Scanned QR Code:", scannedValue);
            event.currentTarget.value = '';  // Clear the input for the next scan
        }
    };

    return (
        <div>
            <input 
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyPress}
                aria-hidden="true"
                className='opacity-0 absolute top-[-1000]'
            />
            {scannedData && <p>Scanned Data: {scannedData}</p>}
            <button onClick={() => inputRef.current?.focus()}>Focus to Scan</button>
        </div>
    );
}

export default TestPage2