type JwtPayloadType = {
    user: {
        email: string,
        role: string,
        name: string
    },
    scanningPoint: {
        pointNo: number | null,
        name: string | null,
        route: string | null
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
    patternNo: string | null;
    po: {
        poCode: string;
    }[] | null;
    garments: GarmentDataType[];
}

type ResponseBundleDataType = {
    success: boolean;
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
    patternNo: string | null;
    poCode: string[];
    timestampStoreIn: string;
    timestampStoreOut: string | null;
    userEmail: string;
}

type SchemaGmtDataType = {
    id: string;
    bundleId: string;
    gmtBarcode: string;
    color: string;
    shade: string;
    size: string;
    styleNo: string;
    buyerName: string;
    partName: string;
    serialNumber: number;
    timestampProduction: string | null;
    isAssembled: boolean;
}

type QCAnalyticsChartDataType = {
    target: number;
    count: number;
    dhuPercentage: number;
}

type StatusCountTypes = {
    totalInspect: number;
    pass: number;
    rework: number;
    reject: number;
}

type ProductDefectTypes = {
    id: string;
    qcStatus: string,
    timestamp: string,
    defects: {
        id: string;
    }[];
}

type GmtDefectTypes = {
    id: string;
    qcStatus: string,
    timestamp: string,
    defects: {
        id: string;
    }[];
}

type HourlyQuantityDataTpes = {
    hourGroup: string;
    inspectQty: number;
    passQty: number;
    reworkQty: number;
    rejectQty: number;
    DHU: number;
    ACV: number;
}

type DhuAndAcvOutputTypes = {
    totalDHU: number;
    hourlyQuantity: HourlyQuantityDataTpes[];
}

type SectionCountsType = {
    section: string;
    productCount: number | null;
}

// Server action functions types
type StoreBundleFunctionResponseType = {
    success: boolean;
    message: string;
    status: number;
}

type ActiveObbSheetsType = {
    id: string;
    name: string;
}[]