import moment from 'moment-timezone';

type ExtendedGmtDefectTypes = GarmentDefectsDataTypesForQC & {
    defectsCount: number;
};

interface DefectAccumulator {
    [key: string]: ExtendedGmtDefectTypes;
}

export function calculateDhuAndAnalyzeDefects2(garmentDefects: GarmentDefectsDataTypesForQC[]): HourlyQuantityFunctionReturnTypes2 {
    let totalInspect = 0;
    let totalDefects = 0;

    const defectsByGmtId = garmentDefects.reduce<DefectAccumulator>((acc, item) => {
        if (!acc[item.gmtId]) {
            acc[item.gmtId] = { ...item, defectsCount: item.defects.length };
        } else {
            acc[item.gmtId].defectsCount += item.defects.length;
        }
        return acc;
    }, {});

    const uniqueProductDefects = Object.values(defectsByGmtId);

    if (uniqueProductDefects.length === 0) {
        return {
            totalDHU: 0,
            hourlyQuantity: [],
        };
    }

    const firstTimestamp = moment(uniqueProductDefects[0].timestamp).startOf('hour');
    const lastTimestamp = moment(uniqueProductDefects[uniqueProductDefects.length - 1].timestamp).endOf('hour');
    const hours = lastTimestamp.diff(firstTimestamp, 'hours') + 1;

    const hourlyGroups = Array.from({ length: hours }, (_, i) => ({
        start: firstTimestamp.clone().add(i, 'hours'),
        end: firstTimestamp.clone().add(i + 1, 'hours').subtract(1, 'second'),
        inspectQty: 0,
        passQty: 0,
        reworkQty: 0,
        rejectQty: 0,
        defects: 0,
        defectsAnalysis: [] as DefectsAnalysisDataTypes2[],
    }));

    uniqueProductDefects.forEach(item => {
        const itemMoment = moment(item.timestamp);
        totalInspect++;
        if (item.qcStatus !== 'pass') {
            totalDefects += item.defectsCount;
        }

        hourlyGroups.forEach(group => {
            if (itemMoment.isBetween(group.start, group.end, null, '[)')) {
                group.inspectQty++;
                if (item.qcStatus === 'pass') group.passQty++;
                if (item.qcStatus === 'rework') group.reworkQty++;
                if (item.qcStatus === 'reject') group.rejectQty++;
                if (item.qcStatus !== 'pass') group.defects += item.defectsCount;

                // Categorize defects by unique defect type and count
                if (item.defects.length > 0) {
                    item.defects.forEach(defect => {
                        const existingDefect = group.defectsAnalysis.find(
                            analysis => analysis.defectType === defect.name
                        );

                        if (existingDefect) {
                            existingDefect.count += 1;
                        } else {
                            group.defectsAnalysis.push({
                                defectType: defect.name,
                                count: 1,
                            });
                        }
                    });
                }
            }
        });
    });

    const totalDHU = (totalDefects / totalInspect) * 100;
    const hourlyQuantity = hourlyGroups.map(group => ({
        hourGroup: `${group.start.format('HH:mm')} - ${group.end.format('HH:mm')}`,
        inspectQty: group.inspectQty,
        passQty: group.passQty,
        reworkQty: group.reworkQty,
        rejectQty: group.rejectQty,
        DHU: group.inspectQty > 0 ? (group.defects / group.inspectQty) * 100 : 0,
        totalDefectsCount: group.defects,
        defectsAnalysis: group.defectsAnalysis,
    }));

    return {
        totalDHU,
        hourlyQuantity,
    };
}