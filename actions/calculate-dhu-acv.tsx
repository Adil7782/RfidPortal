import moment from 'moment';

export function calculateDhuAndAcv(productDefects: ProductDefectTypes[], hours: number, totalTarget: number): DhuAndAcvOutputTypes {
    let totalInspect = 0;
    let totalDefects = 0;
    const hourlyTarget = totalTarget / hours;

    if (productDefects.length > 0) {
        // Get the start time from the first record and set to the nearest hour before
        const firstTimestamp = moment(productDefects[0].timestamp).startOf('hour');
        const hourlyGroups = Array.from({ length: hours }, (_, i) =>
            ({
                start: firstTimestamp.clone().add(i, 'hours'),
                end: firstTimestamp.clone().add(i + 1, 'hours').subtract(1, 'second'),
                inspectQty: 0,
                passQty: 0,
                reworkQty: 0,
                rejectQty: 0,
                defects: 0
            })
        );
    
        productDefects.forEach(item => {
            const itemMoment = moment(item.timestamp);
            totalInspect++;
            if (item.qcStatus !== 'pass') {
                totalDefects += item.defects.length;
            }
    
            hourlyGroups.forEach(group => {
                if (itemMoment.isBetween(group.start, group.end)) {
                    group.inspectQty++;
                    if (item.qcStatus === 'pass') group.passQty++;
                    if (item.qcStatus === 'rework') group.reworkQty++;
                    if (item.qcStatus === 'reject') group.rejectQty++;
                    if (item.qcStatus !== 'pass') group.defects += item.defects.length;
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
            ACV: (group.passQty + group.rejectQty) / hourlyTarget * 100
        }));
    
        return {
            totalDHU,
            hourlyQuantity
        };
    }

    return {
        totalDHU: 0,
        hourlyQuantity: []
    };
}