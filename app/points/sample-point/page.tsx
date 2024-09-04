"use client"

import { useState } from "react";
import SingleRfidReadingModel from "./_components/single-rfid-reading-model";

const SamplePage = () => {
    const [isOpen1, setIsOpen1] = useState(false);

    const toggleDialog1 = () => setIsOpen1(prev => !prev);
    
    return (
        <div>
            <SingleRfidReadingModel
                isOpen={isOpen1}
                toggleDialog={toggleDialog1}
            />
        </div>
    )
}

export default SamplePage