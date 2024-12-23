"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Zap } from "lucide-react";
import { toast as hotToast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SelectUnitObbSheetDate from "./select-unit-obbsheet-date";

const numericFieldSchema = z.string()
    .regex(/^\d+$/, "Must be a valid number")
    .transform(val => parseInt(val) || 0)
    .refine(val => val >= 1, "Must be greater than zero");

const floatFieldSchema = z.string()
    .regex(/^\d*\.?\d*$/, "Must be a valid decimal number")
    .transform(val => parseFloat(val) || 0)
    .refine(val => val >= 0.01, "Must be greater than zero");

const formSchema = z.object({
    unitName: z.string(),
    lineName: z.string(),
    style: z.string(),
    obbSheetId: z.string(),
    date: z.string(),
    sewingOperators: numericFieldSchema,
    ironOperators: numericFieldSchema,
    helpers: numericFieldSchema,
    manPowers: numericFieldSchema,
    frontQcTarget: numericFieldSchema,
    backQcTarget: numericFieldSchema,
    endQcTarget: numericFieldSchema,
    workingHours: numericFieldSchema,
    totalSMV: floatFieldSchema,
    targetEfficiency: floatFieldSchema,
    
    
});

const AddLineEfficiencyResourcesForm = () => {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(true);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sewingOperators: undefined,
            ironOperators: undefined,
            helpers: undefined,
            manPowers: undefined,
            frontQcTarget: undefined,
            backQcTarget: undefined,
            endQcTarget: undefined,
            workingHours: undefined,
            totalSMV: undefined,
            targetEfficiency: undefined,
            
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/admin/line-efficiency-resource', data);
            hotToast.success("Successfully created the record")
            router.refresh();
        } catch (error: any) {
            console.error("ERROR", error);
            hotToast.error("Something went wrong, Please try again!");
        }
    };

    const handleUnitObbDate = (data: { unitName: string, date: string, lineName: string | undefined, style: string | undefined, obbSheetId: string }) => {
        form.setValue("unitName", data.unitName);
        form.setValue("lineName", data.lineName || "");
        form.setValue("style", data.style || "");
        form.setValue("obbSheetId", data.obbSheetId);
        form.setValue("date", data.date);
        setIsDisabled(false);
    };

    const handleNumericChange = (e: any, onChange: any, allowDecimal = false) => {
        const regex = allowDecimal ? /^\d*\.?\d*$/ : /^\d*$/; // Allows decimal if flagged true
        if (regex.test(e.target.value)) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="mb-12">
            {/* <SelectUnitObbSheetDate
                handleSubmit={handleUnitObbDate}
            /> */}
            <div className='mx-auto max-w-7xl my-4 border px-12 pt-6 pb-10 rounded-lg bg-slate-100'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-6">
                            <FormField
                                control={form.control}
                                name="sewingOperators"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Sewing Operators
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ironOperators"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Iron Operators
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="helpers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Helpers
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="manPowers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Utilized Man Powers
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="frontQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Front QC Target   
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="backQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Back QC Target
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            End QC Target
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="workingHours"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Working Hours
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="^\d*$"     // Only whole numbers
                                                disabled={isSubmitting || isDisabled}
                                                placeholder="e.g. '10'"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="totalSMV"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Total SMV
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="decimal"
                                                disabled={isSubmitting || isDisabled}
                                                pattern="^\d*\.?\d*$"       // Allows decimals
                                                placeholder="e.g., 0.75"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange, true)}    // Flag set to true for decimal
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="targetEfficiency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Target Efficiency
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                inputMode="decimal"
                                                disabled={isSubmitting || isDisabled}
                                                pattern="^\d*\.?\d*$"       // Allows decimals
                                                placeholder="e.g., 0.75"
                                                {...field}
                                                onChange={e => handleNumericChange(e, field.onChange, true)}    // Flag set to true for decimal
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                              
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting || isDisabled}
                                className="flex gap-2 pr-5"
                            >
                                <Zap className={cn("w-5 h-5", isSubmitting && "hidden")} />
                                <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                Add Resources
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddLineEfficiencyResourcesForm