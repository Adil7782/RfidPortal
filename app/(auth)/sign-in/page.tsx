import SignInForm from "@/components/auth/sign-in-form";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
    return (
        <section className='w-screen h-screen bg-white'>
            <div className='mx-auto max-w-7xl h-full p-4 flex flex-col justify-between items-center'>
                <div className='mt-8 sm:mt-14 flex-center w-full'>
                    <Image
                        src='/images/logo.svg'
                        alt='Logo Image'
                        width={400}
                        height={400}
                        className="max-sm:w-72"
                    />
                    <div className='mt-14 px-8 sm:px-12 pt-8 pb-3 flex-center bg-slate-100 rounded-lg border w-full sm:w-1/2'>
                        <h1 className="text-xl font-medium dark-text mb-2">Sign in your account 🔐</h1>
                        <SignInForm />
                        <Link 
                            href='mailto:imvinojanv@gmail.com'
                            className="text-sm text-slate-500 mt-12 hover:text-[#0980D4]"
                        >
                            Do you need support?
                        </Link>
                    </div>
                </div>
                <div className='w-full px-4 text-center flex justify-center items-center text-slate-400 text-sm'>
                    <p>© 2024, Emmanuel&apos;s Lanka Pvt Ltd. All rights reserved</p>
                </div>
            </div>
        </section>
    )
}

export default SignInPage