"use client"

import { useState } from "react";

import { connectRFIDReader, stopRFIDReader } from "@/actions/connect-rfid-reader";

const TestPage = () => {
    const [tags, setTags] = useState(new Set<string>());
    const [reading, setReading] = useState(false);

    const handleConnect = () => {
        setReading(true);
        connectRFIDReader(
            (newTag) => setTags(new Set(tags).add(newTag)),
            () => !reading
        ).then(() => {
            console.log("Connection attempt finished.");
            setReading(false);
        });
    };
    const handleStop = () => {
        stopRFIDReader();
        setReading(false);
        console.log(Array.from(tags));
    };

    return (
        <div>
            <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleConnect} disabled={reading}>Connect to RFID Reader</button>
            <button className="p-2 mt-8 bg-red-200 mx-auto" onClick={handleStop} disabled={!reading}>Stop Reading</button>
        </div>
    );
}

export default TestPage