const BundleQrDetails = ({
    data
}: { data: SchemaBundleDataType }) => {
    return (
        <div className="bg-slate-100 rounded-md border">
            <div className='p-4 space-y-4 rounded-md'>
                <div className='flex justify-between items-center'>
                    <p className="font-medium text-slate-800 text-base">Bundle QR</p>
                    <p className="text-slate-600 text-base font-medium">{data.bundleBarcode}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className="font-medium text-slate-800 text-sm">Color</p>
                    <p className="text-slate-600 text-sm">{data.color}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className="font-medium text-slate-800 text-sm">Bondle No</p>
                    <p className="text-slate-600 text-sm">{data.bundleNo}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className="font-medium text-slate-800 text-sm">Ply(s)</p>
                    <p className="text-slate-600 text-sm">{data.startPly} - {data.endPly} ({data.quantity})</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className="font-medium text-slate-800 text-sm">Size</p>
                    <p className="text-slate-600 text-sm">{data.size}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className="font-medium text-slate-800 text-sm">Buyer name</p>
                    <p className="text-slate-600 text-sm">{data.buyerName}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className="font-medium text-slate-800 text-sm">Store-IN date</p>
                    <p className="text-slate-600 text-sm">{data.timestampStoreIn}</p>
                </div>
            </div>
        </div>
    )
}

export default BundleQrDetails