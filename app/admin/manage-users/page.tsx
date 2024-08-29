import { ScanningPoint } from '@prisma/client';

import { db } from '@/lib/db';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const ManageUsersPage = async () => {
    const users = await db.user.findMany({
        include: {
            scanningPoint: true,
            line: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const scanningPoints: ScanningPoint[] | null = await db.scanningPoint.findMany({
        orderBy: {
            pointNo: "asc",
        },
    });

    return (
        <section className='mt-8'>
            <DataTable 
                columns={columns} 
                data={users} 
                scanningPoints={scanningPoints}
            />
        </section>
    )
}

export default ManageUsersPage