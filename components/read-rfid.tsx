"use client"

import axios from "axios";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const ReadRfid = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource('/api/sample/read?command=start');

        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);
            console.log('RFID tag:', data.tag);
        };

        eventSource.onerror = function (error) {
            console.error('EventSource failed:', error);
        };

        return () => {
            eventSource.close();
            fetch('/api/sample/read?command=stop');
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