import { db } from '@/lib/db';
import ShowQcDefects from '@/components/common/show-qc-defects';
import AddQcDefectsForm from '@/components/forms/add-qc-defects-form';

const ManageDefectsPage = async () => {
    const qcPoints = await db.scanningPoint.findMany({
        where: {
            isThisQcPoint: true
        },
        orderBy: {
            pointNo: "asc"
        }
    });

    return (
        <div className='mx-auto max-w-7xl my-16 px-8 pt-6 pb-8 border rounded-lg bg-slate-50'>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-dark font-medium text-xl">Manage the defects for all QC scanning points</h2>
                    <p className="mt-1 text-slate-500 text-sm">Select the QC point and add new defects if you need</p>
                </div>
                <AddQcDefectsForm qcPoints={qcPoints} />
            </div>
            <div className="mt-8">
                <ShowQcDefects qcPoints={qcPoints} />
            </div>
        </div>
    )
}

export default ManageDefectsPage