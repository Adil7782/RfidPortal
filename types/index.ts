type JwtPayloadType = {
    user: {
        email: string,
        role: string,
        name: string
    },
    scanningPoint: {
        name: string | null,
        pointNo: string | null,
        section: string | null,
    },
    iat: number,
    exp: number
}

type GarmentDataType = {
    gmtBarcode: string,
    color: string,
    shade: string,
    size: string,
    styleNo: string,
    buyerName: string,
    partName: string,
    serialNumber: number;
}

type BundleDataType = {
    bundleBarcode: string | number;
    bundleNo: string | number;
    color: string;
    quantity: string | number;
    startPly: string | number;
    endPly: string | number;
    cuttingNo: string | number;
    cuttingDate: string;
    size: string;
    buyerName: string;
    garments: GarmentDataType[];
}

type ResponseBundleDataType = {
    success: string;
    message: string;
    data: BundleDataType[] | null;
}