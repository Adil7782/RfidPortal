"use client"

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2, Zap } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { fetchActiveObbSheetsDetails } from "@/actions/from-eliot/fetch-active-obb-sheets-details";

interface SelectObbSheetProps {
    handleSelectObb: (obbSheet: ObbSheetDetailsType) => void;
};

const SelectObbSheet = ({
    handleSelectObb
}: SelectObbSheetProps) => {
    const [open, setOpen] = useState(false);
    const [selectedObbSheet, setSelectedObbSheet] = useState<ObbSheetDetailsType | null>(null);
    const [obbSheets, setObbSheets] = useState<ObbSheetDetailsType[]>([]);

    const fetchObbSheet = async () => {
        const obbSheets: ObbSheetDetailsType[] = await fetchActiveObbSheetsDetails();
        setObbSheets(obbSheets);
    }

    useEffect(() => {
        fetchObbSheet()
    }, []);

    return (
        <div className='border px-12 pt-6 pb-10 rounded-lg bg-slate-100'>
            <p className="mb-2 font-medium">Select Obb Sheet</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between font-normal"
                    >
                        {obbSheets ?
                            <>
                                {selectedObbSheet
                                    ? obbSheets.find((sheet) => sheet.id === selectedObbSheet.id)?.name
                                    : "Select OBB Sheets..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </>
                            :
                            "No OBB sheets available!"
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Search OBB sheet..." />
                        <CommandList>
                            <CommandEmpty>No OBB sheet found!</CommandEmpty>
                            <CommandGroup>
                                {obbSheets && obbSheets.map((sheet) => (
                                    <CommandItem
                                        key={sheet.id}
                                        value={sheet.name}
                                        onSelect={() => {
                                            setSelectedObbSheet(sheet);
                                            handleSelectObb(sheet);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedObbSheet?.id === sheet.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {sheet.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default SelectObbSheet