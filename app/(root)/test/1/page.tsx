"use client"

import { useState } from 'react'
import RFIDReader from '../_components/rfid-reader';

const TestPage1 = () => {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <div>
            <RFIDReader setTags={setTags} />
            <ul>
                {tags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
        </div>
    )
}

export default TestPage1