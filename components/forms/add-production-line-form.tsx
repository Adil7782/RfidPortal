"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Check, Loader2, Plus, Zap } from "lucide-react";
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
import { UNITS } from "@/constants";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Production line name is required"
    }),
    unit: z.string().min(1, {
        message: "Unit is required"
    }),
});

const AddProductionLineForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "LINE-",
            unit: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/admin/production-line', data);
            toast({
                title: "Successfully created new line",
                variant: "success",
                description: (
                    <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                        <code className="text-slate-800">
                            Line name: {res.data.data.name}
                        </code>
                    </div>
                ),
            });
            router.refresh();
            form.reset();
            setIsOpen(false)
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                toast({
                    title: error.response.data,
                    variant: "error"
                });
            } else {
                toast({
                    title: "Something went wrong! Try again",
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
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="primary">
                    <Plus className="w-4 h-4" />
                    Add new line
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create production line</DialogTitle>
                    <DialogDescription>
                        Create the production lines for each unit.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 mt-2"
                    >
                        <div className="flex gap-2">
                            <div className="w-2/3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Line name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Enter the line name"
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
                                    name="unit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Unit
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {UNITS.map((unit) => (
                                                        <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
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
                                    <Zap className={cn("w-5 h-5", isSubmitting && "hidden", !isValid &&  "hidden")} />
                                    <Ban className={cn("w-5 h-5 hidden", !isValid && "block")}/>
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

export default AddProductionLineForm