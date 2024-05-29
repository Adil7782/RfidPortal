"use client"

import axios from "axios";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const ReadRfid = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource('/api/sample/read');

        eventSource.onmessage = function (event) {
            console.log('New RFID tag:', event.data);
            setTags(prev => [...prev, event.data as string]);
        };

        eventSource.onerror = function (error) {
            console.error('EventSource failed:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            {/* <Button onClick={handleReadTags} disabled={isReading}>
                {isReading ? 'Reading...' : 'Read Tags'}
            </Button>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <Button variant='primary' className="mt-12" onClick={handleSaveTags}>Save Tags</Button> */}

            <div>
                <h2>RFID Tags</h2>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ReadRfid