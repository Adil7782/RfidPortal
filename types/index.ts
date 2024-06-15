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
    bundleBarcode: string;
    bundleNo: string;
    color: string;
    quantity: string;
    startPly: string;
    endPly: string;
    cuttingNo: string;
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

type SchemaBundleDataType = {
    id: string;
    bundleBarcode: number;
    bundleNo: number;
    color: string;
    quantity: number;
    startPly: number;
    endPly: number;
    cuttingNo: number;
    cuttingDate: string;
    size: string;
    buyerName: string;
    storeInTimestamp: string;
    storeOutTimestamp: string | null;
    userEmail: string;
}