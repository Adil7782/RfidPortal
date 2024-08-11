"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Loader2, Plus } from "lucide-react";
import axios from "axios";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface AddQCSectionTargetFormProps {
    qcSections: any;
    email: string | undefined;
}

const formSchema = z.object({
    qcSectionId: z.string().min(1, {
        message: "QC section is required"
    }),
    userEmail: z.string(),
    dailyTarget: z.number(),
    workingHours: z.number(),
});

const AddQCSectionTargetForm = ({
    qcSections,
    email
}: AddQCSectionTargetFormProps) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            qcSectionId: "",
            userEmail: email,
            dailyTarget: undefined,
            workingHours: undefined,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/scanning-point/qc-section/target', data);
            toast({
                title: "Set target successfully!",
                variant: "success"
            });
            router.refresh();
            form.reset();
            setIsOpen(false)
        } catch (error: any) {
            toast({
                title: error.response.data || "Something went wrong! Try again",
                variant: "error",
                description: (
                    <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                        <code className="text-slate-800">
                            ERROR: {error.message}
                        </code>
                    </div>
                ),
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="primary">
                    <Plus className="w-4 h-4" />
                    Add new target
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add QC section target</DialogTitle>
                    <DialogDescription>
                        Add the QC section target for today. Click save if you are done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 mt-2"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="qcSectionId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            QC Section
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select unit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {qcSections && qcSections.map((section: any) => (
                                                    <SelectItem key={section.id} value={section.id}>{section.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dailyTarget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Daily Target
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                className="hide-steps-number-input"
                                                placeholder="Enter the daily target"
                                                disabled={isSubmitting}
                                                {...field}
                                                onChange={(e) => {
                                                    const newValue: number = parseInt(e.target.value);
                                                    form.setValue('dailyTarget', newValue, { shouldValidate: true, shouldDirty: true });
                                                }}
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
                                                type="number"
                                                className="hide-steps-number-input"
                                                placeholder="Enter the number of hours"
                                                disabled={isSubmitting}
                                                {...field}
                                                onChange={(e) => {
                                                    const newValue: number = parseInt(e.target.value);
                                                    form.setValue('workingHours', newValue, { shouldValidate: true, shouldDirty: true });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <div className="w-full mt-4 mb-2 flex justify-between gap-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    variant='primary'
                                    disabled={!isValid || isSubmitting}
                                    className="flex gap-2 pr-5"
                                >
                                    <Plus className={cn("w-5 h-5", isSubmitting && "hidden", !isValid && "hidden")} />
                                    <Ban className={cn("w-5 h-5 hidden", !isValid && "block")} />
                                    <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                    Add target
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddQCSectionTargetForm