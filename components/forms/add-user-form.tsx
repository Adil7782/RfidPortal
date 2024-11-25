"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Check, Loader2, Plus, Zap } from "lucide-react";
import axios from "axios";
import { ProductionLine, ScanningPoint } from "@prisma/client";

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

interface AddUserFormProps {
    scanningPoints: ScanningPoint[] | null;
}

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Production line name is required"
    }),
    role: z.string().min(1, {
        message: "Role is required"
    }),
    employeeId: z.string().min(1, {
        message: "Employee Id is required"
    }),
    scanningPointId: z.string().nullable(),
    unit: z.string().nullable(),
    lineId: z.string().nullable(),
    phone: z.string().regex(phoneRegex, 'Invalid Phone Number!'),
    email: z.string().min(1, {
        message: "Email is required"
    }).email("This is not a valid email!"),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
}).superRefine((data, ctx) => {
    // Make unit and scanningPointId required unless role is admin
    if (data.role === 'user') {
        if (!data.unit) {
            ctx.addIssue({
                code: 'custom',  // Adding the 'code' field as required
                path: ['unit'],
                message: "Unit is required",
            });
        }
        if (!data.scanningPointId) {
            ctx.addIssue({
                code: 'custom',  // Adding the 'code' field as required
                path: ['scanningPointId'],
                message: "Scanning point is required",
            });
        }
    }
    // Check password matching
    if (data.confirmPassword !== data.password) {
        ctx.addIssue({
            code: 'custom',  // Adding the 'code' field as required
            path: ['confirmPassword'],
            message: "The passwords did not match!",
        });
    }
});

const AddUserForm = ({
    scanningPoints
}: AddUserFormProps) => {
    const { toast } = useToast();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [unit, setUnit] = useState<string | null>(null);
    const [lines, setLines] = useState<ProductionLine[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            employeeId: "",
            scanningPointId: "",
            email: "",
            phone: "",
            lineId: "",
            unit: "",
            password: "",
            confirmPassword: "",
        },
    });

    const role = form.watch("role");
    const { isSubmitting, isValid } = form.formState;

    const fetchLines = useCallback(async () => {
        if (unit) {
            try {
                const response = await axios.get(`/api/admin/production-line?unit=${unit}`);
                setLines(response.data.data);
            } catch (error) {
                console.error("Error fetching lines:", error);
                setLines([]);
            }
        } else {
            setLines([]);
        }
    }, [unit]);

    useEffect(() => {
        fetchLines();
    }, [unit, fetchLines]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/auth/register', data);
            toast({
                title: "Successfully created new user account",
                variant: "success"
            });
            form.reset();
            setIsOpen(false);
            router.refresh();
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
                    Add new user
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create new user account</DialogTitle>
                    <DialogDescription>
                        Add new user for each scanning point.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-2"
                    >
                        <div className="flex gap-2">
                            <div className="w-2/3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="e.g. 'V. V. Vinojan'"
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
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">
                                                Role
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="tracker">Garment Tracker</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
                        <FormField
                                control={form.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn("text-base", (role === "admin" || role === "tracker") &&  "text-slate-400")}>
                                            Unit
                                        </FormLabel>
                                        <Select 
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setUnit(value)
                                            }} 
                                            defaultValue={field.value || undefined}
                                            disabled={(role === "admin" || role === "tracker")}
                                        >
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

                            <FormField
                                control={form.control}
                                name="lineId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn("text-base", (role === "admin" || role === "tracker") &&  "text-slate-400")}>
                                            Line <span className="text-xs font-normal text-slate-500">(Optional)</span>
                                        </FormLabel>
                                        <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value || undefined}
                                            disabled={(role === "admin" || role === "tracker")}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select line" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {lines.map((line) => (
                                                    <SelectItem key={line.id} value={line.id}>{line.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="scanningPointId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn("text-base", (role === "admin" || role === "tracker") &&  "text-slate-400")}>
                                            Scanning Point
                                        </FormLabel>
                                        <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value || undefined}
                                            disabled={(role === "admin" || role === "tracker")}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select scanning point" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {scanningPoints && scanningPoints.map((point) => (
                                                    <SelectItem key={point.id} value={point.id}>{point.pointNo} - {point.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="employeeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            Employee ID
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Enter employee ID"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                disabled={isSubmitting}
                                                placeholder="e.g. 'example@gmail.com'"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                disabled={isSubmitting}
                                                placeholder="Enter phone number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={isSubmitting}
                                                placeholder="Enter the password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={isSubmitting}
                                                placeholder="Confirm the password"
                                                {...field}
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
                                    <Zap className={cn("w-5 h-5", isSubmitting && "hidden", !isValid && "hidden")} />
                                    <Ban className={cn("w-5 h-5 hidden", !isValid && "block")} />
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

export default AddUserForm