"use client"

import { useState } from 'react';

import { readSingleRFIDTag } from '@/actions/read-single-rfid-tag';

const TestPage1 = () => {
    const [isReading, setIsReading] = useState(false);
    const [tag, setTag] = useState<string | null>(null);

    const handleReadTag = async () => {
        setIsReading(true);
        const tagValue = await readSingleRFIDTag();
        setTag(tagValue);
        setIsReading(false);
    }

    return (
        <div>
            {isReading ? (
                <p>Reading...</p>
            ) : (
                <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleReadTag}>Read RFID</button>
            )}
            <ul>
                <li>{tag}</li>
            </ul>
        </div>
    )
}

export default TestPage1