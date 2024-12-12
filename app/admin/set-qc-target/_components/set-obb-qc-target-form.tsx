"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { toast as hotToast } from "react-hot-toast";

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
import { ObbQcTarget } from "@prisma/client";
import { useEffect } from "react";

interface SetObbQcTargetFormProps {
    obbSheet: ObbSheetDetailsType;
    initialData: ObbQcTarget | null;
}

const formSchema = z.object({
    obbSheetId: z.string().min(1),
    name: z.string().optional(),
    version: z.string().optional(),
    style: z.string().optional(),
    buyer: z.string().optional(),
    unitName: z.string().optional(),
    lineName: z.string().optional(),
    color: z.string().optional(),
    totalSMV: z.string().optional(),
    workingHours: z.string().optional(),
    frontQcTarget: z.number().optional(),
    backQcTarget: z.number().optional(),
    assemblyQcTarget: z.number().optional(),
    endQcTarget: z.number().optional(),
    buttonQcTarget: z.number().optional(),
    dryQcTarget: z.number().optional(),
    wetQcTarget: z.number().optional(),
    finishLineQcTarget: z.number().optional(),
});

const SetObbQcTargetForm = ({
    obbSheet,
    initialData,
}: SetObbQcTargetFormProps) => {
    const router = useRouter();
    
    useEffect(() => {
        form.setValue("frontQcTarget", initialData?.frontQcTarget || undefined);
        form.setValue("backQcTarget", initialData?.backQcTarget || undefined);
        form.setValue("assemblyQcTarget", initialData?.assemblyQcTarget || undefined);
        form.setValue("endQcTarget", initialData?.endQcTarget || undefined);
        form.setValue("buttonQcTarget", initialData?.buttonQcTarget || undefined);
        form.setValue("dryQcTarget", initialData?.dryQcTarget || undefined);
        form.setValue("wetQcTarget", initialData?.wetQcTarget || undefined);
        form.setValue("finishLineQcTarget", initialData?.finishLineQcTarget || undefined);
    }, [initialData]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            obbSheetId: obbSheet.id,
            name: obbSheet.name,
            version: obbSheet.version,
            style: obbSheet.style,
            buyer: obbSheet.buyer,
            unitName: obbSheet.unitName,
            lineName: obbSheet.lineName,
            color: obbSheet.color,
            totalSMV: obbSheet.totalSMV?.toString(),
            workingHours: obbSheet.workingHours?.toString(),
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/admin/obb-qc-target', data);
            hotToast.success("Saved the QC Targets");
            router.refresh();
        } catch (error: any) {
            console.error("ERROR", error);
            hotToast.error("Something went wrong! Try again");
        }
    }

    return (
        <div className="border px-8 py-6 rounded-lg bg-slate-100">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-4 mt-4"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="frontQcTarget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Front QC Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("frontQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
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
                                    <FormLabel className="text-base">
                                        Back QC Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("backQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
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
                                    <FormLabel className="text-base">
                                        Assembly QC Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("assemblyQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
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
                                    <FormLabel className="text-base">
                                        End QC Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("endQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="buttonQcTarget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Button QC Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("buttonQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
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
                                    <FormLabel className="text-base">
                                        Dry QC Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("dryQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
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
                                    <FormLabel className="text-base">
                                        Wet QC Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("wetQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="finishLineQcTarget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Finish Line Qc Target
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isSubmitting}
                                            placeholder="Enter the QC target..."
                                            {...field}
                                            onChange={(e) => {
                                                const newValue: number = parseInt(e.target.value);
                                                form.setValue("finishLineQcTarget", newValue, { shouldValidate: true, shouldDirty: true });
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="flex gap-2 pr-5 ml-auto right-0"
                    >
                        <Check className={cn("w-5 h-5", isSubmitting && "hidden")} />
                        <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SetObbQcTargetForm