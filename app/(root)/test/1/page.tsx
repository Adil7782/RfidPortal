"use client"

import { useState } from 'react';

import { readSingleRFIDTag } from '@/actions/read-single-rfid-tag';

const TestPage1 = () => {
    const [isReading, setIsReading] = useState(false);
    const [tag, setTag] = useState<string>('');

    const handleStartReading = async () => {
        setIsReading(true);
        const readTag = await readSingleRFIDTag(setTag);
        setTag(readTag);
        setIsReading(false);
    };

    const handleStopReading = () => {
        setIsReading(false);
    }

    return (
        <div>
            {isReading ? (
                <p>Reading...</p>
            ) : (
                <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleStartReading}>Connect to RFID Reader</button>
            )}
            <ul>
                <li>{tag}</li>
            </ul>
        </div>
    )
}

export default TestPage1