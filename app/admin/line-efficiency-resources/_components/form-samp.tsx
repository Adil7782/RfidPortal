"use client"

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
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
    utilizedSewingOperators: z.coerce.number().min(1, { message: "Value must be greater than 0" }).optional(),
    utilizedIronOperators: z.coerce.number().min(1, { message: "Value must be greater than 0" }).optional(),
    utilizedHelpers: z.coerce.number().min(1, { message: "Value must be greater than 0" }).optional(),
    utilizedManPowers: z.coerce.number().min(1, { message: "Value must be greater than 0" }).optional(),
    obbSewingOperators: z.coerce.number().min(1, { message: "Value must be greater than 0" }).optional(),
    obbIronOperators: z.coerce.number().min(1, { message: "Value must be greater than 0" }).optional(),
    obbHelpers: z.coerce.number().min(1, { message: "Value must be greater than 0" }).optional(),
    obbManPowers: z.number().min(1, { message: "Value must be greater than 0" }).optional(),
    // frontQcTarget: z.coerce.number().optional(),
    // backQcTarget: z.coerce.number().optional(),
    endQcTarget: z.coerce.number().optional(),
    // assemblyQcTarget: z.coerce.number().optional(),
    // buttonQcTarget: z.coerce.number().optional(),
    // dryQcTarget: z.coerce.number().optional(),
    // wetQcTarget: z.coerce.number().optional(),
    // finishingLineQcTarget: z.coerce.number().optional(),
    workingHours: z.coerce.number().optional(),
    targetWorkingHours: z.coerce.number().optional(),
    totalSMV: z.coerce.number().optional(),
    targetEfficiency: z.coerce.number().optional(),
    utilizedMachines:z.coerce.number().optional(),
    // dailyPlanEfficiency:floatFieldSchema

});

const FormSample = (units:any,setNewDate:string) => {

    const [flag,setFlag] = useState<boolean>(false)

    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(true);
    units= units.units

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        utilizedSewingOperators: undefined,
        utilizedIronOperators: undefined,
        utilizedHelpers: undefined,
        utilizedManPowers: undefined,
        obbSewingOperators: undefined,
        obbIronOperators: undefined,
        obbHelpers: undefined,
        obbManPowers: undefined,
        // frontQcTarget: undefined,
        // backQcTarget: undefined,
        endQcTarget: undefined,
        // assemblyQcTarget: undefined,
        // buttonQcTarget: undefined,
        // dryQcTarget: undefined,
        // wetQcTarget: undefined,
        // finishingLineQcTarget: undefined,
        workingHours: undefined,
        targetWorkingHours: undefined,
        totalSMV: undefined,
        targetEfficiency: undefined,
        utilizedMachines: undefined,
        // dailyPlanEfficiency: undefined
      },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log("datas",data)

        if(!flag)
        {try {
            console.log("first",data)
            const res = await axios.post('/api/admin/line-efficiency-resource', data);
            hotToast.success("Successfully created the record")
           
            setFlag(true)
            router.refresh();   

        } catch (error: any) {
            console.error("ERROR", error);
            hotToast.error(error.response?.data?.message || "Something went wrong, Please try again!");
        
        }}
        else{

            try {
                const res = await axios.put('/api/admin/line-efficiency-resource', data);
                hotToast.success("Successfully Updated the record")
                router.refresh();
            } catch (error: any) {
                console.error("ERROR", error);
                hotToast.error(error.response?.data?.message || "Something went wrong, Please try again!");
            
            }


        }
    };


    const resetFields = ()=>{
        form.setValue("totalSMV", Number(0));
                form.setValue("utilizedSewingOperators", Number(0));
                form.setValue("utilizedIronOperators", Number(0));
                form.setValue("utilizedHelpers", Number(0));
                form.setValue("utilizedManPowers", Number(0));
                form.setValue("obbSewingOperators", Number(0));
                form.setValue("obbIronOperators", Number(0));
                form.setValue("obbHelpers", Number(0));
                form.setValue("obbManPowers", Number(0));
              
                form.setValue("endQcTarget", Number(0));
        
                form.setValue("workingHours", Number(0));
                form.setValue("targetWorkingHours", Number(0));
                form.setValue("targetEfficiency", Number(0));
                form.setValue("utilizedMachines", Number(0));
    }


    const handleUnitObbDate = async (data: { unitName: string, date: string, lineName: string | undefined, style: string | undefined, obbSheetId: string }) => {
       console.log(data)
       setFlag(false)
       resetFields()
        form.setValue("unitName", data.unitName);
        form.setValue("lineName", data.lineName || "");
        form.setValue("style", data.style || "");
        form.setValue("obbSheetId", data.obbSheetId);
        form.setValue("date", data.date);
        
        setIsDisabled(false);

        try {

            const response = await axios.get(`/api/admin/line-efficiency-resource`, {
                params: { obbSheetId: data.obbSheetId,date:data.date },
            });

            console.log("asdasd",response)
            
            if (response){

                
                
                setFlag(true)
                hotToast.success("Recent Data Fetched")
                form.setValue("totalSMV", Number(response.data.totalSMV));
                form.setValue("utilizedSewingOperators", Number(response.data.utilizedSewingOperators));
                form.setValue("utilizedIronOperators", Number(response.data.utilizedIronOperators));
                form.setValue("utilizedHelpers", Number(response.data.utilizedHelpers));
                form.setValue("utilizedManPowers", Number(response.data.utilizedManPowers));
                form.setValue("obbSewingOperators", Number(response.data.obbSewingOperators));
                form.setValue("obbIronOperators", Number(response.data.obbIronOperators));
                form.setValue("obbHelpers", Number(response.data.obbHelpers));
                form.setValue("obbManPowers", Number(response.data.obbManPowers));
                // form.setValue("frontQcTarget", Number(response.data.frontQcTarget));
                // form.setValue("backQcTarget", Number(response.data.backQcTarget));
                form.setValue("endQcTarget", Number(response.data.endQcTarget));
                // form.setValue("assemblyQcTarget", Number(response.data.assemblyQcTarget));
                // form.setValue("buttonQcTarget", Number(response.data.buttonQcTarget));
                // form.setValue("dryQcTarget", Number(response.data.dryQcTarget));
                // form.setValue("wetQcTarget", Number(response.data.wetQcTarget));
                // form.setValue("finishingLineQcTarget", Number(response.data.finishingLineQcTarget));
                form.setValue("workingHours", Number(response.data.workingHours));
                form.setValue("targetWorkingHours", Number(response.data.targetWorkingHours));
                form.setValue("targetEfficiency", Number(response.data.targetEfficiency));
                form.setValue("utilizedMachines", Number(response.data.utilizedMachines));
                
            }
            else{
                setFlag(false)
                resetFields()
            }
        } catch (error) {
            
        }


    };

    const handleNumericChange = (e: any, onChange: any, allowDecimal = false) => {
        const regex = allowDecimal ? /^\d*\.?\d*$/ : /^\d*$/; // Allows decimal if flagged true
        if (regex.test(e.target.value)) {
            onChange(e.target.value);
        }
    };
    
    useEffect(() => {
        const totalUtilizedManPowers = 
            (Number(form.watch('utilizedSewingOperators')) || 0) +
            (Number(form.watch('utilizedIronOperators')) || 0) +
            (Number(form.watch('utilizedHelpers')) || 0);
        
        // Manually set the value in the form state
        form.setValue('utilizedManPowers', totalUtilizedManPowers);
    }, [form.watch('utilizedSewingOperators'), form.watch('utilizedIronOperators'), form.watch('utilizedHelpers'), form]);

    useEffect(() => {
        const totalObbManPowers = 
            (Number(form.watch('obbSewingOperators')) || 0) +
            (Number(form.watch('obbIronOperators')) || 0) +
            (Number(form.watch('obbHelpers')) || 0);
        
        // Manually set the value in the form state
        form.setValue('obbManPowers', totalObbManPowers);
    }, [form.watch('obbSewingOperators'), form.watch('obbIronOperators'), form.watch('obbHelpers'), form]);
  

    return (
        <div className="mb-12">
            <SelectUnitObbSheetDate
                handleSubmit={handleUnitObbDate}
                units={units}
            />
            <div className='mx-auto max-w-7xl my-4 border px-12 pt-6 pb-10 rounded-lg bg-slate-100'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4"
                    >
                        


                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-6">
                        <fieldset className="border border-gray-300 p-4 mb-4">
                        <legend className="text-lg font-bold mb-2">Utilized Man Power </legend>
                            <FormField
                                control={form.control}
                                name="utilizedSewingOperators"
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
                                name="utilizedIronOperators"
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
                                name="utilizedHelpers"
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
    name="utilizedManPowers"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Total Man Power</FormLabel>
            <FormControl>
                <Input
                    type="text"
                    inputMode="numeric"
                    pattern="^\d*$"     // Only whole numbers
                    disabled={isSubmitting || isDisabled}
                    placeholder="e.g. '10'"
                    {...field}
                    value={form.watch('utilizedManPowers')}  // Display the dynamically calculated value
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
                            </fieldset>
                            
                            <fieldset className="border border-gray-300 p-4 mb-4">
                        <legend className="text-lg font-bold mb-2">OBB Man Power </legend>
                            <FormField
                                control={form.control}
                                name="obbSewingOperators"
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
                                name="obbIronOperators"
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
                                name="obbHelpers"
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
    name="obbManPowers"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Total Man Power</FormLabel>
            <FormControl>
                <Input
                    type="text"
                    inputMode="numeric"
                    pattern="^\d*$"     // Only whole numbers
                    disabled={isSubmitting || isDisabled}
                    placeholder="e.g. '10'"
                    {...field}
                    value={form.watch('obbManPowers')}  // Display the dynamically calculated value
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
                            </fieldset>

                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-6">
                            
                            {/* <FormField
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
                                name="assemblyQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                        Assembly QC
                                        Target
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
                            /> */}

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
                            {/* <FormField
                                control={form.control}
                                name="buttonQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                        Button QC
                                        Target
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
                                name="dryQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                        Dry QC Target
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
                                name="wetQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                        Wet QC Target
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
                                name="finishingLineQcTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                        Finishing Line QC Target
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
                            /> */}
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
                                name="targetWorkingHours"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                           Target Working Hours
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
  <FormField
                                control={form.control}
                                name="utilizedMachines"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                           Utilized Machines
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



                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                type="submit"
                         
                                className="flex gap-2 pr-5"
                            >
                                <Zap className={cn("w-5 h-5", isSubmitting && "hidden")} />
                                <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                {flag ? 'Update':'Add Resources'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default FormSample