import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface QCRfidProductDetailProps {
    rfid: string;
    buyerName: string;
    style: string;
}

const QCRfidProductDetails = ({
    rfid,
    buyerName,
    style
}: QCRfidProductDetailProps) => {
    return (
        <div className="bg-slate-100 rounded-md border">
            <div className='p-4 flex justify-between'>
                <h3 className='text-xl font-medium'>RFID</h3>
                <Badge variant="outline" className='text-base font-medium md:px-4 text-slate-700 bg-slate-200'>
                    {rfid}
                </Badge>
            </div>
            <Separator />
            <div className='p-2'>
                <div className='p-4 space-y-4 bg-slate-200 rounded-md'>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800">Buyer Name</p>
                        <p className="text-slate-600">{buyerName}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="font-medium text-slate-800">Style</p>
                        <p className="text-slate-600">{style}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QCRfidProductDetails