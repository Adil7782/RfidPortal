"use server"

import axios from "axios";

export async function fetchBundleDataFromServer( qrCode: string ): Promise<ResponseBundleDataType> {
    try {
        // const apiResponse = await axios.get(`https://cutting.hisanmastery.com/api/ProductionData/GetBundleList?bundleBarcode=${qrCode}`, {
        //     headers: {
        //         'X-API-Key': '4d7b1c3e-9a2f-45d8-a61e-82f0e394c72a'
        //     },
        // });
        const apiResponse = await axios.get(`http://api.hameemgroup.com:8222/api/ProductionData/GetBundleList?bundleBarcode=${qrCode}`, {
            headers: {
                'X-API-Key': '4d7b1c3e-9a2f-45d8-a61e-82f0e394c72a'
            },
        });
        
        return new Promise((resolve) => resolve(apiResponse.data as ResponseBundleDataType));
    } catch (error: any) {
        console.error("[FETCH_BUNDLE_DATA_FROM_SERVER_ERROR]", error);
        return {
            success: true,
            message: "Error fetching bundle data from the server: " + "|" + (error.message || "Unknown error"),
            data: null
        };
    }
}