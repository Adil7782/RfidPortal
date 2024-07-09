"use client"

import { useState } from 'react';

import { readSingleRFIDTag } from '@/actions/read-single-rfid-tag';

const TestPage1 = () => {
    const [tag, setTag] = useState<string | null>(null);

    const handleReadTag = async () => {
        const tagValue = await readSingleRFIDTag();
        setTag(tagValue);
    }

    return (
        <div>
            <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleReadTag}>Read Single RFID Tag</button>
            {tag && <div className="mt-4 text-lg">Read RFID Tag: {tag}</div>}
        </div>
    )
}

export default TestPage1