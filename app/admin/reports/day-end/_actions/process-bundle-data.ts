type HourlyReport = {
    hourGroup: string;
    totalBundles: number;
    totalGarmentQty: number;
};

type CuttingReport = {
    cuttingNo: number;
    buyerName: string;
    style: string;
    color: string;
    shade: string;
    InputBundlQty: number;
    InputGarmentQty: number;
};

export function processBundleDataHourly(bundles: FetchBundlesForDayEndReportReturnType[]): HourlyReport[] {
    const hourGroups = [
        "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
        "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
        "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00",
        "20:00 - 21:00", "21:00 - 22:00"
    ];

    const result: HourlyReport[] = hourGroups.map(group => ({
        hourGroup: group,
        totalBundles: 0,
        totalGarmentQty: 0
    }));

    bundles.forEach(bundle => {
        const bundleHour = new Date(bundle.timestamp).getHours();

        // Match the bundleHour to the hour group
        const hourGroupIndex = hourGroups.findIndex(group => {
            const [start, end] = group.split(" - ").map(time => parseInt(time.split(":")[0], 10));
            return bundleHour >= start && bundleHour < end;
        });

        if (hourGroupIndex !== -1) {
            result[hourGroupIndex].totalBundles += 1;
            result[hourGroupIndex].totalGarmentQty += bundle.garmentQty;
        }
    });

    return result;
}

export function processBundleDataByCuttingNo(bundles: FetchBundlesForDayEndReportReturnType[]): CuttingReport[] {
    const groupedData: { [key: number]: CuttingReport } = {};

    bundles.forEach(bundle => {
        const { cuttingNo, buyerName, style, color, shade, garmentQty } = bundle;

        if (!groupedData[cuttingNo]) {
            groupedData[cuttingNo] = {
                cuttingNo,
                buyerName,
                style,
                color,
                shade,
                InputBundlQty: 0,
                InputGarmentQty: 0
            };
        }

        groupedData[cuttingNo].InputBundlQty += 1; // Increment bundle count
        groupedData[cuttingNo].InputGarmentQty += garmentQty; // Add garment quantity
    });

    // Convert grouped data to an array
    return Object.values(groupedData);
}