import { db } from "@/lib/db";
import GmtQCDashboardPanel from "@/components/scanning-point/qc/gmt/gmt-qc-dashboard-panel";
import { fetchGarmentDefectsWithOperations } from "@/actions/qc/gmt/fetch-garment-defects-with-operations";
import { calculateDhuAndAnalyzeDefects } from "@/actions/qc/gmt/calculate-dhu-and-analyze-defects";

const GmtQCScanningPointPage = async ({
    params
}: {
    params: { obbSheetId: string }
}) => {
    const target = await db.obbQcTarget.findUnique({
        where: {
            obbSheetId: params.obbSheetId
        }
    });

    // Fetch the QC point details
    const qcPoint = await db.scanningPoint.findUnique({
        where: {
            pointNo: 5      // GMT Production QC - FRONT
        },
        include: {
            defects: true
        }
    });

    if (!qcPoint) return <p>QC point not found</p>;
    
    // const garmentDefects = await fetchGarmentDefectsWithOperations(qcPoint.id);
    const garmentDefects = await fetchGarmentDefectsWithOperations({ qcPointId: qcPoint.id, obbSheetId: params.obbSheetId });
    const { totalDHU, hourlyQuantity } = calculateDhuAndAnalyzeDefects(garmentDefects);
    // console.log("Hourly DHU:", hourlyQuantity.map(group => `${group.hourGroup} | ${group.inspectQty} | ${group.passQty} | ${group.reworkQty} | ${group.rejectQty} | DHU: ${group.DHU.toFixed(2)}% | Count: ${group.totalDefectsCount}`));
    
    const quantities: StatusCountTypes = {
        totalInspect: hourlyQuantity.map(value => value.inspectQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        pass: hourlyQuantity.map(value => value.passQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        rework: hourlyQuantity.map(value => value.reworkQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        reject: hourlyQuantity.map(value => value.rejectQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    }

    return (
        <GmtQCDashboardPanel
            part="front"
            obbSheetId={params.obbSheetId}
            defects={qcPoint?.defects}
            qcPointId={qcPoint.id}
            totalStatusCounts={quantities}
            totalDHU={parseFloat(totalDHU.toFixed(1))}
            hourlyQuantity={hourlyQuantity}
            dailyTarget={target ? target.frontQcTarget : null}
        />
    );
}

export default GmtQCScanningPointPage;