import SignInForm from "@/components/auth/sign-in-form";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
    return (
        <section className='w-screen h-screen bg-white'>
            <div className='mx-auto max-w-7xl h-full p-4 flex flex-col justify-between items-center'>
                <div className='mt-16 flex-center w-full'>
                    <Image
                        src='/images/logo.svg'
                        alt='Logo Image'
                        width={400}
                        height={400}
                    />
                    <div className='mt-14 px-12 pt-8 pb-3 flex-center bg-slate-100 rounded-lg border w-1/2'>
                        <SignInForm />
                        <Link 
                            href='mailto:imvinojanv@gmail.com'
                            className="text-sm text-slate-500 mt-12 hover:text-[#0980D4]"
                        >
                            Do you need support?
                        </Link>
                    </div>
                </div>
                <div className='w-full px-4 flex justify-between items-center text-slate-500 text-sm'>
                    <p>© 2024, Emmanuel's Lanka Pvt Ltd. All rights reserved</p>
                    <p>Privacy & Policy</p>
                </div>
            </div>
        </section>
    )
}

export default SignInPage