"use client"

import { useState } from 'react';

import { readSingleRFIDTag } from '@/actions/read-single-rfid-tag';

const TestPage1 = () => {
    const [rfidTag, setRfidTag] = useState('');

    const handleReadTag = async () => {
        try {
            const tag = await readSingleRFIDTag();
            setRfidTag(tag);
            console.log("Received RFID Tag:", tag);
        } catch (error) {
            console.error("Error reading RFID tag:", error);
        }
    };

    return (
        <div>
            <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleReadTag}>Read Single RFID Tag</button>
            {rfidTag && <p className="mt-4 text-lg">RFID Tag: {rfidTag}</p>}
        </div>
    )
}

export default TestPage1