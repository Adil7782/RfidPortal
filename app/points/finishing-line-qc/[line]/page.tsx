import { db } from "@/lib/db";
import { fetchProductDefectsWithOperations } from "@/actions/qc/product/fetch-product-defects-with-operations";
import { calculateDhuAndAnalyzeDefects } from "@/actions/qc/product/calculate-dhu-and-analyze-defects";
import ProductQCDashboardPanel from "../_components/product-qc-dashboard-panel";

const FinishingLineQcScanningPointPage = async ({
    params
}: {
    params: { line: string }
}) => {
    // Fetch the QC point details
    const qcPoint = await db.scanningPoint.findUnique({
        where: {
            pointNo: 18      // Finishing Line QC
        },
        include: {
            defects: true
        }
    });

    if (!qcPoint) return <p>QC point not found</p>;

    const productDefects = await fetchProductDefectsWithOperations({ qcPointId: qcPoint.id, part: "finish", fline: params.line });
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
            part="finish"
            line={params.line}
            defects={qcPoint?.defects}
            qcPointId={qcPoint.id}
            totalStatusCounts={quantities}
            totalDHU={parseFloat(totalDHU.toFixed(1))}
            hourlyQuantity={hourlyQuantity}
            dailyTarget={1200}
        />
    );
}

export default FinishingLineQcScanningPointPage;