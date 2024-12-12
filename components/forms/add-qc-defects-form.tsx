"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Plus } from "lucide-react";
import { toast as hotToast } from "react-hot-toast";

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
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScanningPoint } from "@prisma/client";

interface AddQcDefectsFormProps {
    qcPoints: ScanningPoint[];
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Defect name is required"
    }),
    qcPointNo: z.string().min(1),
});

const AddQcDefectsForm = ({
    qcPoints
}: AddQcDefectsFormProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            qcPointNo: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/scanning-point/qc-section/defect', data);
            hotToast.success("Successfully created new defect");
            router.refresh();
            form.reset();
            setIsOpen(false)
        } catch (error: any) {
            console.error("ERROR", error);
            hotToast.error("Something went wrong! Try again");
        } finally {
            // window.location.reload();
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button className="flex gap-2 pr-5" onClick={() => setIsOpen(true)}>
                    <Plus className="w-5 h-5" />
                    Add new defect
                </Button>
            </DialogTrigger>
            <DialogContent className="max-md:py-8 md:p-8">
                <DialogHeader className="mt-2">
                    <DialogTitle>
                        Add QC Defect
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Add new defect for the QC point. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 mt-4"
                    >
                        <div className="flex gap-2">
                            <div className="w-2/3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Defect
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="e.g. 'Skip Stitch'"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-1/3">
                                <FormField
                                    control={form.control}
                                    name="qcPointNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                QC Point
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the QC point" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {qcPoints.map((qcPoint) => (
                                                        <SelectItem key={qcPoint.id} value={qcPoint.pointNo.toString()}>{qcPoint.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="mt-4 mb-2 flex gap-4">
                                <Button type="button" variant='secondary' className="flex gap-2 pr-5" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="flex gap-2 pr-5"
                                >
                                    <Check className={cn("w-5 h-5", isSubmitting && "hidden")} />
                                    <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                                    Save
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddQcDefectsForm