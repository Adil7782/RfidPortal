"use client"

import { useState } from 'react'
import RFIDReader from '../_components/rfid-reader';

const TestPage1 = () => {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <div>
            <RFIDReader onTagsUpdated={(newTags) => setTags(newTags)} />
            <ul>
                {tags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
        </div>
    )
}

export default TestPage1