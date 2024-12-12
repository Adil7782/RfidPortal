import { db } from "@/lib/db";
import ProductQCDashboardPanel from "@/components/scanning-point/qc/product/product-qc-dashboard-panel";
import { fetchProductDefectsWithOperations } from "@/actions/qc/product/fetch-product-defects-with-operations";
import { calculateDhuAndAnalyzeDefects } from "@/actions/qc/product/calculate-dhu-and-analyze-defects";

const DryingQcScanningPointPage = async ({
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
            pointNo: 13      // Drying Section QC
        },
        include: {
            defects: true
        }
    });

    if (!qcPoint) return <p>QC point not found</p>;

    const productDefects = await fetchProductDefectsWithOperations({ qcPointId: qcPoint.id, part: "dry", obbSheetId: params.obbSheetId });
    const { totalDHU, hourlyQuantity } = calculateDhuAndAnalyzeDefects(productDefects);
    // console.log("Hourly DHU:", hourlyQuantity.map(group => `${group.hourGroup} | ${group.inspectQty} | ${group.passQty} | ${group.reworkQty} | ${group.rejectQty} | DHU: ${group.DHU.toFixed(2)}% | Count: ${group.totalDefectsCount}`));
    
    const quantities: StatusCountTypes = {
        totalInspect: hourlyQuantity.map(value => value.inspectQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        pass: hourlyQuantity.map(value => value.passQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        rework: hourlyQuantity.map(value => value.reworkQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
        reject: hourlyQuantity.map(value => value.rejectQty).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    }

    return (
        <ProductQCDashboardPanel
            part="dry"
            route="/points/drying-section-qc"
            obbSheetId={params.obbSheetId}
            defects={qcPoint?.defects}
            qcPointId={qcPoint.id}
            totalStatusCounts={quantities}
            totalDHU={parseFloat(totalDHU.toFixed(1))}
            hourlyQuantity={hourlyQuantity}
            dailyTarget={target ? target.dryQcTarget : null}
        />
    );
}

export default DryingQcScanningPointPage;