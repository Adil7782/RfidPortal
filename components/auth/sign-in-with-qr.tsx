"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Loader2, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast as hotToast } from 'react-hot-toast';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SignInWithQr = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    // let jsonString = `{"email": "sample@email.com", "password": "sample_password"}`;
    // let jsonObject: { email: string, password: string } = JSON.parse(jsonString);
    // console.log(jsonObject);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const scannedValue: string = event.currentTarget.value.trim();
            console.log("Scanned QR Code:", scannedValue);
            event.currentTarget.value = '';

            try {
                const jsonValue = JSON.parse(scannedValue);         // Attempt to parse the JSON

                if (jsonValue && typeof jsonValue.email === 'string' && typeof jsonValue.password === 'string') {
                    setIsLoading(true);
                    hotToast.success(`Logging in as ${jsonValue.email}`);
                    console.log("JSON:", jsonValue);

                    try {
                        const response = await axios.post('/api/auth/sign-in', jsonValue);
                        const path = response.data.data.role === 'admin' ? '/admin' : `/points/${response.data.data.route}`
                        router.push(path);
                        hotToast.success("Authenticated successfully");
                    } catch (error: any) {
                        hotToast.error(error.response.data || "Something went wrong! Try again");
                    }
                    setIsLoading(false);
                } else {
                    showInvalidFormatToast();
                }
            } catch (error) {
                // Error parsing the JSON data
                hotToast.error("Invalid QR Code, please try again");
                console.error("Error parsing QR code data:", error);
            }
            // inputRef.current?.focus();
            // event.currentTarget === null;
        }
    };

    function showInvalidFormatToast() {
        hotToast((t) => (
            <span>
                <p className="text-red-500 text-sm">Invalid QR Code format. Expected JSON format:</p>
                <pre style={{ fontFamily: "monospace" }} className="w-full p-2 mt-2 bg-gray-200 text-gray-600">
                    {`{
    "email": "example@example.com", 
    "password": "yourPassword"
}`}
                </pre>
            </span>
        ), {
            duration: 4000,  // Customize the duration as needed
            style: { border: "1px solid #f44336" }, // Customize the style as needed
        });
    }

    return (
        <div className="w-full mt-3">
            {/* QR input listener */}
            <input
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyPress}
                aria-hidden="true"
                className='opacity-0 absolute top-[-1000]'
            />

            {!isLoading ?
                <div onClick={() => inputRef.current?.focus()}>
                    <Image
                        src='/images/scanning-qr.gif'
                        alt="scanning qr"
                        width={600}
                        height={200}
                        className="mt-2 w-full rounded-md border cursor-pointer"
                    />
                    <p className="-mt-7 text-sm text-amber-900/60 text-center">Click here to scan QR</p>
                </div>
                :
                <div className="w-full h-40 rounded-md flex justify-center items-center bg-[#f9f7f1] border">
                    <Loader2 className="animate-spin w-8 h-8 text-amber-900" />
                </div>
            }
        </div>
    )
}

export default SignInWithQr