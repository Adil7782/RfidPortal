import Image from "next/image";
import Link from "next/link";

import SignInForm from "@/components/auth/sign-in-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
    return (
        <div className='px-8 sm:px-12 pt-8 pb-3 flex-center bg-slate-100 rounded-lg border w-full max-w-2xl sm:w-1/2'>
            <h1 className="text-xl font-medium dark-text mb-2">Sign in your account 🔐</h1>
            <SignInForm />
            <Separator className="my-6" />
            <Link href="/sign-in/qr" className="w-full">
                <Button
                    variant="outline"
                    className="w-full bg-slate-50 tracking-wide"
                >
                    Sign in with QR
                </Button>
            </Link>
            <Link
                href='mailto:imvinojanv@gmail.com'
                className="text-sm text-slate-500 mt-8 hover:text-[#0980D4]"
            >
                Do you need support?
            </Link>
        </div>
    )
}

export default SignInPage