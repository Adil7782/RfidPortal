import moment from 'moment-timezone';

import { db } from '@/lib/db';
import ProductDetailsTable from './product-details-table';
import { Badge } from '@/components/ui/badge';

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
        <div className='p-4 mt-6'>
            <div className='mb-2 flex items-center gap-2'>
                <Badge className='text-base px-6'>{products.length}</Badge>
                <p className='text-sm text-slate-500'>Total assembled garments</p>
            </div>
            <ProductDetailsTable data={products} />
        </div>
    )
}

export default ProductAssembleSummary