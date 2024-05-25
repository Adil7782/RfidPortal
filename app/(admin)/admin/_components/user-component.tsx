import { ScanningPoint } from '@prisma/client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { db } from '@/lib/db';

const UserComponent = async () => {
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
        <div className='mt-8'>
            <DataTable 
                columns={columns} 
                data={users} 
                scanningPoints={scanningPoints}
            />
        </div>
    )
}

export default UserComponent