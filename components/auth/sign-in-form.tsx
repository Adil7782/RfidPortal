"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2, ArrowRight } from "lucide-react";

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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Gender is required"
    }).email("This is not a valid email!"),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
          })
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-6 mt-6"
                >
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
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!isValid || isSubmitting}
                            className="mt-4 flex gap-2 pr-5 w-full text-base"
                        >
                            Sign in
                            <KeyRound className={cn("w-5 h-5", isSubmitting && "hidden")} />
                            <Loader2 className={cn("animate-spin w-5 h-5 hidden", isSubmitting && "flex")} />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SignInForm