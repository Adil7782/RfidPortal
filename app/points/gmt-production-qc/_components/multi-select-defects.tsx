"use client"

import { useState } from 'react';

interface Defect {
    id: string;
    name: string;
}

const MultiSelectDefects = ({ defects }: { defects: Defect[] | undefined }) => {
    const [selectedDefects, setSelectedDefects] = useState<Defect[]>([]);

    const toggleDefect = (defect: Defect) => {
        setSelectedDefects((prev) =>
            prev.find(d => d.id === defect.id) ? prev.filter(d => d.id !== defect.id) : [...prev, defect]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Selected Defects: ", selectedDefects);
        alert('Selected Defects: ' + selectedDefects.map(d => d.name).join(", "));
    };
    console.log("selectedDefects", selectedDefects);

    return (
        <div className="p-8">
            <h1 className="text-lg font-bold mb-4">Select Defects</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap gap-2'>
                    {defects && defects.map((defect) => (
                        <div key={defect.id} className="flex items-center mb-2">
                            <div
                                key={defect.id}
                                onClick={() => toggleDefect(defect)}
                                className={
                                    `p-4 border rounded cursor-pointer 
                                    ${selectedDefects.includes(defect) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`
                                }
                            >
                                {defect.name}
                            </div>
                        </div>
                    ))}
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default MultiSelectDefects