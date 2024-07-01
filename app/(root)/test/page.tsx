"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const TestPage = () => {
    const { toast } = useToast();
    const [rfid, setRfid] = useState();

    const handleOnClick = async () => {
        try {
            const response = await axios.get('/api/admin/test');
            console.log("response: ", response);
        } catch (error: any) {
            console.log("ERROR: ", error.message);
            // toast({
            //     title: error.response.data,
            //     variant: "error"
            // });
        }
    };

    return (
        <div className="p-12">
            TestPage
            <Button onClick={handleOnClick}>
                Scan
            </Button>
        </div>
    )
}

export default TestPage