"use client"

import React, { useState } from "react";
import Link from "next/link";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";

const SelectObbSheet = ({
    obbSheets,
    route
}: { obbSheets: ActiveObbSheetsType; route: string; }) => {
    const [open, setOpen] = useState(false);
    const [selectedObbSheetId, setSelectedObbSheetId] = useState<string>('');

    const handleSelectSheet = (id: string) => {
        setSelectedObbSheetId(id);
        setOpen(false);
    };

    const getSheetNameById = (id: string) => {
        return obbSheets.find(sheet => sheet.id === id)?.name || "Select obb sheets...";
    };

    return (
        <div className='mt-20 border px-10 pt-8 p-10 rounded-lg bg-slate-100 space-y-2'>
            <h1 className="text-slate-600 font-medium">Select OBB Sheet</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between font-normal"
                    >
                        <>
                            {getSheetNameById(selectedObbSheetId)}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search OBB sheet..." />
                        <CommandList>
                            {obbSheets && obbSheets.length > 0 ? (
                                <CommandGroup>
                                    {obbSheets.map((sheet) => (
                                        <Link 
                                            key={sheet.id}
                                            // href={isAssemblyQc ? `/points/product-assembly-qc/${sheet.id}` : `/points/gmt-production-${part}-qc/${sheet.id}`}
                                            href={`${route}/${sheet.id}`}
                                        >
                                            <CommandItem
                                                value={sheet.name}
                                                className="cursor-pointer"
                                                onSelect={() => handleSelectSheet(sheet.id)}
                                            >
                                                <Check
                                                    className={`mr-2 h-4 w-4 ${selectedObbSheetId === sheet.id ? "opacity-100" : "opacity-0"}`}
                                                />
                                                {sheet.name}
                                            </CommandItem>
                                        </Link>
                                    ))}
                                </CommandGroup>
                            ) : (
                                <CommandEmpty>No OBB sheet found!</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SelectObbSheet;
