import moment from 'moment-timezone';

type ExtendedGmtDefectTypes = GmtDefectTypes & {
    defectsCount: number;
};

interface DefectAccumulator {
    [key: string]: ExtendedGmtDefectTypes;
}

export function calculateDhuAndAcv(productDefects: GmtDefectTypes[], hourlyTarget: number): DhuAndAcvOutputTypes {
    let totalInspect = 0;
    let totalDefects = 0;

    const defectsByGmtId = productDefects.reduce<DefectAccumulator>((acc, item) => {
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
            hourlyQuantity: []
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
        defects: 0
    }));

    uniqueProductDefects.forEach(item => {
        const itemMoment = moment(item.timestamp);
        totalInspect++;
        if (item.qcStatus !== 'pass') {
            totalDefects += item.defectsCount;
        }

        hourlyGroups.forEach(group => {
            if (itemMoment.isBetween(group.start, group.end)) {
                group.inspectQty++;
                if (item.qcStatus === 'pass') group.passQty++;
                if (item.qcStatus === 'rework') group.reworkQty++;
                if (item.qcStatus === 'reject') group.rejectQty++;
                if (item.qcStatus !== 'pass') group.defects += item.defectsCount;
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
        ACV: hourlyTarget > 0 ? ((group.passQty + group.rejectQty) / hourlyTarget) * 100 : 0
    }));

    return {
        totalDHU,
        hourlyQuantity
    };
}
