"use client"

import { useState } from "react";

import { readBulkRFIDTags, stopReading } from "@/actions/read-bulk-rfid-tags";

const TestPage = () => {
    const [isReading, setIsReading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);

    const handleStartReading = async () => {
        setIsReading(true);
        const readTags = await readBulkRFIDTags(setTags);
        setTags(readTags);
        setIsReading(false);
    };

    const handleStopReading = () => {
        setIsReading(false);
        stopReading();
    }

    return (
        <div>
            {isReading ? (
                <button className="p-2 mt-8 bg-red-500 mx-auto" onClick={handleStopReading}>Stop Reading</button>
            ) : (
                <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleStartReading}>Connect to RFID Reader</button>
            )}
            <ul>
                {tags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
        </div>
    )
}

export default TestPage