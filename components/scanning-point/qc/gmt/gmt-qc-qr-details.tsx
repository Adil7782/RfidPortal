import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface QCGmtQrDetailProps {
    gmtBarcode: string;
    color: string;
    partName: string;
    size: string;
    style: string;
}

const GmtQcQrDetails = ({
    gmtBarcode,
    color,
    partName,
    size,
    style
}: QCGmtQrDetailProps) => {
    return (
        <div className="bg-slate-100 rounded-md border">
            <div className='p-2 flex justify-between'>
                {/* <h3 className='font-medium'>GMT QR</h3> */}
                <Badge variant="outline" className='text-sm w-full flex justify-center font-semibold text-slate-700 bg-slate-200'>
                    {gmtBarcode}
                </Badge>
            </div>
            <Separator />
            <div className='p-2'>
                <div className='p-4 space-y-4 bg-slate-200 rounded-md'>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800 text-sm">Color</p>
                        <p className="text-slate-600 text-sm">{color}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800 text-sm">Style</p>
                        <p className="text-slate-600 text-sm">{style}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800 text-sm">Part name</p>
                        <p className="text-slate-600 text-sm">{partName}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800 text-sm">Size</p>
                        <p className="text-slate-600 text-sm">{size}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GmtQcQrDetails