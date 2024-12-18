import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface QCProductRfidDetailProps {
    rfid: string;
    color: string;
    shade: string;
    size: string;
    styleNo: string;
}

const ProductQcRfidDetails = ({
    rfid,
    color,
    shade,
    size,
    styleNo
}: QCProductRfidDetailProps) => {
    return (
        <div className="bg-slate-100 rounded-md border">
            <div className='p-2 flex justify-between'>
                {/* <h3 className='font-medium'>GMT QR</h3> */}
                <Badge variant="outline" className='text-base w-full flex justify-center font-semibold text-slate-700 bg-slate-200'>
                    {rfid}
                </Badge>
            </div>
            <Separator />
            <div className='p-2'>
                <div className='p-4 space-y-4 bg-slate-200 rounded-md text-lg'>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800">Color</p>
                        <p className="text-slate-600">{color}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800">Shade</p>
                        <p className="text-slate-600">{shade}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800">Style</p>
                        <p className="text-slate-600">{styleNo}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800">Size</p>
                        <p className="text-slate-600">{size}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductQcRfidDetails