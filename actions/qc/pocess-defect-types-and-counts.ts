type FunctionReturnType = {
    name: string;
    count: number;
}[];

export function processDefectTypesAndCounts(data: (GarmentDefectsDataTypesForQC | ProductDefectsDataTypesForQC)[]): FunctionReturnType {
    const defectCounts: Record<string, number> = {};

    data.forEach((entry) => {
        entry.defects.forEach((defect) => {
            const defectName = defect.name;
            defectCounts[defectName] = (defectCounts[defectName] || 0) + 1;
        });
    });

    // Convert the counts object into an array and sort by count descending
    return Object.entries(defectCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
}