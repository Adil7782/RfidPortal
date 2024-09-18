"use client"

import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { CalendarIcon, Check, ChevronsUpDown, Filter, Loader2, Zap } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fetchActiveObbSheets } from "@/actions/qc/fetch-active-obb-sheets";

interface SelectScanningPointAndDateProps {
    // scanningPoints: {
    //     id: string;
    //     name: string;
    //     pointNo: number;
    // }[] | null;
    handleSubmit: (data: { obbSheetId: string; date: Date;part:string  }) => void;
};

type ObbSheetDataType = {
    id: string;
    name: string;
};

const formSchema = z.object({
    obbSheetId: z.string().min(1, {
        message: "Obb Sheet is required"
    }),
    // scanningPointId: z.string().min(1, {
    //     message: "Scanning point is required"
    // }),
    // pointNo: z.number(),
    date: z.date(),
    part: z.string().min(1, {
        message: "Part is required"
    })
});

const partData :any[] = [

    {
     name:"Front" ,
     id:"front"
    },
    {
     name:"Back" ,
     id:"back"
    },
    {
     name:"Line End" ,
     id:"line-end"
    },
    {
     name:"Line Combined",
     id:"line"
    }
 ]

const SelectObbsheetAndDate = ({
   
    handleSubmit
}: SelectScanningPointAndDateProps) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [obbSheets, setObbSheets] = useState<ObbSheetDataType[]>([]);
    const [openPart, setOpenPart] = useState(false); 

    const fetchObbSheet = async () => {
        const obbSheets: ObbSheetDataType[] = await fetchActiveObbSheets();
        setObbSheets(obbSheets);
    }

    useEffect(() => {
      fetchObbSheet()
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            obbSheetId: "",
            // scanningPointId: "",
            // pointNo: undefined,
            date: undefined,
            part:"",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    return (
        <div className='mt-16 border px-12 pt-6 pb-10 rounded-lg bg-slate-100'>
            
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full flex flex-col items-end gap-x-6 gap-y-6 mt-4"
                >
                    <div className="w-full flex flex-col md:flex-row gap-6">
                        <div className="md:w-2/4">
                            <FormField
                                control={form.control}
                                name="obbSheetId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-base">
                                            OBB Sheet
                                        </FormLabel>
                                        <Popover open={open2} onOpenChange={setOpen2}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open2}
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {obbSheets ?
                                                        <>
                                                            {field.value
                                                                ? obbSheets.find((sheet) => sheet.id === field.value)?.name
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
                                                                        form.setValue("obbSheetId", sheet.id)
                                                                        setOpen2(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value === sheet.id ? "opacity-100" : "opacity-0"
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>



                        <div className="md:w-2/4">
                            <FormField
                                control={form.control}
                                name="part"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-base">
                                            Select Part
                                        </FormLabel>
                                        <Popover open={openPart} onOpenChange={setOpenPart}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open2}
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {partData  ?
                                                        <>
                                                            {field.value
                                                                ? partData.find((part) => part.id === field.value)?.name
                                                                : "Select Part..."}
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
                                                            {partData && partData.map((sheet) => (
                                                                <CommandItem
                                                                    key={sheet.id}
                                                                    value={sheet.name}
                                                                    onSelect={() => {
                                                                        form.setValue("part", sheet.id)
                                                                        setOpen2(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value === sheet.id ? "opacity-100" : "opacity-0"
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* <div className="md:w-1/4">
                            <FormField
                                control={form.control}
                                name="scanningPointId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-base">
                                            Scanning Point
                                        </FormLabel>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {scanningPoints ?
                                                        <>
                                                            {field.value
                                                                ? scanningPoints.find((point) => point.id === field.value)?.name
                                                                : "Select Scanning Point..."}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </>
                                                        :
                                                        "No scanning points available!"
                                                    }
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search scanning point..." />
                                                    <CommandList>
                                                        <CommandEmpty>No scanning point found!</CommandEmpty>
                                                        <CommandGroup>
                                                            {scanningPoints && scanningPoints.map((point) => (
                                                                <CommandItem
                                                                    key={point.id}
                                                                    value={point.name}
                                                                    onSelect={() => {
                                                                        form.setValue("scanningPointId", point.id)
                                                                        form.setValue("pointNo", point.pointNo)
                                                                        setOpen(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            field.value === point.id ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {point.pointNo} - {point.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div> */}
                        <div className="md:w-2/4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-base">
                                            Date
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className="w-full justify-start text-left font-normal"
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("2024-01-01")
                                                    }
                                                    initialFocus
                                                    className="w-full"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="flex max-md:w-full gap-2 pr-5"
                    >
                        <Zap className={cn("w-5 h-5", isSubmitting && "hidden")} />
                        <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                        Generate
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SelectObbsheetAndDate