"use client"

import React, { useState, useRef, useEffect } from 'react';

const TestPage2 = () => {
    const [scannedData, setScannedData] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Automatically focus the input when the component mounts
        inputRef.current?.focus();
    }, []);

    const handleScan = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScannedData(event.target.value);
        console.log("Scanned QR Code:", event.target.value);
        // Optionally, clear the input after processing to be ready for the next scan
        event.target.value = '';
    };

    return (
        <div>
            <input 
                ref={inputRef}
                type="text"
                onChange={handleScan}
                style={{ opacity: 0.0, position: 'absolute', top: '-1000px' }} // Hide input off-screen
                aria-hidden="true" // Make sure this input is not picked up by screen readers
            />
            <p>Scanned Data: {scannedData}</p>
            <button onClick={() => inputRef.current?.focus()}>Focus to Scan</button>
        </div>
    );
}

export default TestPage2