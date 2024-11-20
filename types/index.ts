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
    unitName?: string;
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
    unitName?: string;
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
    unitName: string | null;
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
    unitName: string | null;
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

type CalculateGmtDefectCountTypes = {
    totalStatusCounts: StatusCountTypes;
    currentHourStatusCounts: StatusCountTypes;
}

type ProductDefectTypes = {
    id: string;
    productId: string;
    qcStatus: string,
    timestamp: string,
    defects: {
        id: string;
    }[];
}

type GmtDefectTypes = {
    id: string;
    gmtId: string;
    qcStatus: string,
    timestamp: string,
    defects: {
        id: string;
        name: string;
    }[];
}

type GarmentDefectsDataTypesForQC = {
    id: string;
    gmtId: string;
    qcStatus: string,
    timestamp: string,
    obbOperationId: string | null;
    operatorName: string | null;
    defects: {
        id: string;
        name: string;
    }[];
    operationName?: string;
    operationCode?: string;
}

type ProductDefectsDataTypesForQC = {
    id: string;
    productId: string;
    qcStatus: string,
    timestamp: string,
    obbOperationId: string | null;
    operatorName: string | null;
    defects: {
        id: string;
        name: string;
    }[];
    operationName?: string;
    operationCode?: string;
}

type DefectsAnalysisDataTypes = {
    operatorName: string;
    operationName: string;
    defects: string[];
    numberOfDefects: number;
}

type HourlyQuantityDataTypes = {
    hourGroup: string;
    inspectQty: number;
    passQty: number;
    reworkQty: number;
    rejectQty: number;
    DHU: number;
    totalDefectsCount?: number;
    defectsAnalysis?: DefectsAnalysisDataTypes[];
}

type HourlyQuantityFunctionReturnTypes = {
    totalDHU: number;
    hourlyQuantity: HourlyQuantityDataTypes[];
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

type ObbSheetDetailsType = {
    id: string;
    buyer: string;
    style: string;
    unitName: string;
    lineName: string;
    color?: string;
}

type ObbSheetsDataForLineEffType = {
    id: string;
    name?: string;
    buyer: string;
    style: string;
    unitName?: string;
    lineName?: string;
    color?: string;
}

type ProductionLineDetailsType = {
    id: string;
    name: string;
}

type ActiveObbOperationsResType = {
    id: string;
    seqNo: number;
    operationName: string;
    operationCode: string;
}[]

type OperatorsForOperationResType = {
    id: string;
    name: string;
    rfid: string;
    employeeId: string;
}[]

type GmtQCPayloadDataType = {
    gmtId: string;
    part: string;
    qcPointId: string;
    obbSheetId: string;
    qcStatus: string;
    operations: {
        obbOperationId: string;
        operatorId: string;
        operatorName: string;
        defects: string[];
    }[]
}

type AssemblyQCPayloadDataType = {
    productId: string;
    qcPointId: string;
    part: string;
    obbSheetId: string;
    qcStatus: string;
    operations: {
        obbOperationId: string;
        operatorId: string;
        operatorName: string;
        defects: string[];
    }[]
}

type QCPayloadDataType = {
    productId: string;
    qcPointId: string;
    part: string;
    obbSheetId: string;
    qcStatus: string;
    defects: string[];
}

type ProductDataForRFIDType = {
    id: string;
    rfid: string;
    shade: string;
    color: string;
    size: string;
    styleNo: string;
    buyerName: string;
}

type GmtQcDetailsType = {
    id: string;
    qcStatus?: string;
    gmtData: {
        gmtBarcode: string;
        color: string;
        shade: string;
        size: string;
        styleNo: string;
        buyerName: string;
        serialNumber: number;
    }
}

type BulkGateUpdateResponseType = {
    success: boolean;
    message: string;
    notValid?: {
        message: string;
        data: {
            rfid: string;
            currentPointNo: number;
        }[];
    }
    exist?: {
        message: string;
        data: {
            rfid: string;
        }[];
    }
}