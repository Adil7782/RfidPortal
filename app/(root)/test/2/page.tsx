"use client"

import { readQRCode } from '@/actions/read-qr-code';
import { useState } from 'react';

const TestPage1 = () => {
    const [qrCode, setQrCode] = useState<string | null>(null);

    const handleReadQRCode = async () => {
        const qrValue = await readQRCode();
        setQrCode(qrValue);
    }

    return (
        <div>
            <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleReadQRCode}>Read QR Code</button>
            {qrCode && <div className="mt-4 text-lg">QR Code: {qrCode}</div>}
        </div>
    )
}

export default TestPage1