"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { devicePortBind, cmdDeviceRegistryContinuesTagID, devicePortOpenReadSerialData } from './_components/reader.js';

const TestPage = () => {
    const { toast } = useToast();
    const [rfid, setRfid] = useState();

    const handleOnClick = async () => {
        try {
            devicePortBind();
            await cmdDeviceRegistryContinuesTagID();
            const tagId = await devicePortOpenReadSerialData();
            console.log("RFID: " + tagId);
            toast({
                title: "RFID:" + tagId,
                variant: "error"
            });
        } catch (error: any) {
            console.log("ERROR: ", error);
            toast({
                title: error.response.data,
                variant: "error"
            });
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