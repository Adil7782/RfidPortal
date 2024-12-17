import moment from 'moment-timezone';

import { db } from '@/lib/db';
import ProductDetailsTable from './product-details-table';

const ProductAssembleSummary = async ({ obbSheetId }: { obbSheetId: string }) => {
    const today = moment().format('YYYY-MM-DD');

    const products = await db.product.findMany({
        where: {
            obbSheetId,
            timestampAssembled: {
                gte: `${"2024-12-15"} 00:00:00`,
                lte: `${"2024-12-15"} 23:59:59`,
            }
        },
        include: {
            frontGmt: true,
            rfid: true
        }
    });

    return (
        <div className='p-4 mt-8'>
            <ProductDetailsTable data={products}/>
        </div>
    )
}

export default ProductAssembleSummary