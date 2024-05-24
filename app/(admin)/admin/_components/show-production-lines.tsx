"use client"

import { useState, useEffect } from "react";
import { ProductionLine } from "@prisma/client";
import axios from "axios";

import { cn } from "@/lib/utils";
import { units } from '@/constants';

const ShowProductionLines = () => {
    const [selectedUnit, setSelectedUnit] = useState('unit-1');

    const [lines, setLines] = useState<ProductionLine[]>([]);

    useEffect(() => {
        const fetchLines = async () => {
            if (selectedUnit) {
                try {
                    const response = await axios.get(`/api/admin/production-line?unit=${selectedUnit}`);
                    setLines(response.data.data);
                } catch (error) {
                    console.error("Error fetching lines:", error);
                }
            }
        };

        fetchLines();
    }, [selectedUnit]);

    return (
        <div className="w-full flex gap-4">
            <div className="md:w-1/3 flex flex-col space-y-2">
                {units.map((unit) => (
                    <div 
                        key={unit.id}
                        className={cn(
                            "bg-white border rounded-md py-3 px-4 hover:bg-[#0980D4]/5 hover:border-[#0980D4] cursor-pointer transition",
                            selectedUnit === unit.id && "border-[#0980D4] bg-[#0980D4]/10"
                        )}
                        onClick={() => setSelectedUnit(unit.id)}
                    >
                        {unit.name}
                    </div>
                ))}
            </div>
            <div className="md:w-2/3 bg-slate-200 rounded-md py-3 px-4 overflow-y-auto">
                {selectedUnit ? 
                <div>
                    <h2 className="text-lg font-medium mb-2 dark-text">Production Lines</h2>
                    <div className="mt-2">
                        {lines.length === 0 ? (
                            <p className="text-slate-500 text-sm">No lines found for the selected unit.</p>
                        ) : (
                            <ul className="flex gap-2 flex-wrap">
                                {lines.map((line) => (
                                    <li key={line.id} className="rounded-full px-4 py-1 bg-[#0980D4]/5 border border-[#0980D4] text-slate-600 font-medium">
                                        {line.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                :
                <div className="w-full h-full flex justify-center items-center text-slate-600">
                    Please select a unit!
                </div>
                }
            </div>
        </div>
    )
}

export default ShowProductionLines