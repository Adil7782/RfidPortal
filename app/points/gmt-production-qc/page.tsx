import { db } from "@/lib/db"
import MultiSelectDefects from "./_components/multi-select-defects"

const ScanningPoint4Page = async () => {
    const defects = await db.qcSection.findUnique({
        where: {
            name: "Product Assembly QC"
        },
        select: {
            defect: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return (
        <div>
            <MultiSelectDefects defects={defects?.defect} />
        </div>
    )
}

export default ScanningPoint4Page