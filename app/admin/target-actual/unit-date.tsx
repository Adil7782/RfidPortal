"use client"

import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { CalendarIcon, Check, ChevronsUpDown, Filter, Loader2 } from "lucide-react";

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
// import { getObb } from "./actions";

interface SelectObbSheetAndDateProps {
   
    handleSubmit: (data: { unit: string; date: Date }) => void;
    units:{
        id: string;
        name: string;
    }[] | null;
};

const formSchema = z.object({
    
    date: z.date(),
    unit: z.string().min(1, {
        message: "Unit is required"
    }),
});


export type obb = {
    obbSheet: {
        id: string;
        name: string;
    }[] | null;
}



const SelectObbSheetAndDate = ({
    
    handleSubmit,
    units
}: SelectObbSheetAndDateProps) => {
    const [open, setOpen] = useState(false)

    const [unitOpen, setUnitOpen] = useState(false);
const [obbSheetOpen, setObbSheetOpen] = useState(false);
const [obbSheet, setObbSheet] = useState<{ id: string; name: string }[]>([]);

    // console.log(units)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           
            date: undefined,
            unit:""
        },
    });

    const { isSubmitting, isValid } = form.formState;



    

    return (
        <div className='mt-6 mb-6 border px-12 pt-4 pb-10 rounded-lg shadow-md bg-slate-100'>
            
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full flex flex-col lg:flex-row items-end gap-x-8 gap-y-6 mt-4"
                >
                    <div className="w-full flex flex-col md:flex-row gap-6">
                        <div className="md:w-2/3">
                            <FormField
                                control={form.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-base">
                                            Units
                                        </FormLabel>
                                        <Popover open={unitOpen} onOpenChange={setUnitOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {units ?
                                                        <>
                                                            {field.value
                                                                ? units.find((sheet) => sheet.id === field.value)?.name
                                                                : "Select Units..."}
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
                                                            {units && units.map((sheet) => (
                                                                <CommandItem
                                                                    key={sheet.id}
                                                                    value={sheet.name}
                                                                    onSelect={() => {
                                                                        form.setValue("unit", sheet.id)
                                                                        setUnitOpen(false)
                                                                      

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


                      

                        <div className="md:w-1/3">
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
                        className="flex max-md:w-full w-32 gap-2 pr-5"
                    >
                        <Filter className={cn("w-5 h-5", isSubmitting && "hidden")} />
                        <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                        Genarate
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SelectObbSheetAndDate