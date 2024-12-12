"use client"

import { Button } from "@/components/ui/button";

interface QRListTableProps {
    qrCodes: string[];
    errorQrCodes: string[] | null;
    onRemove: (index: number) => void;
}

const QRListTable = ({ qrCodes, errorQrCodes, onRemove }: QRListTableProps) => {
    return (
        <div className="overflow-y-auto relative sm:rounded-lg border max-h-[560px]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="sticky top-0 text-sm text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            QR Code <span className="font-medium">({errorQrCodes ? errorQrCodes.length : qrCodes.length})</span>
                        </th>
                        {!errorQrCodes &&
                            <th scope="col" className="py-3 px-6 text-end">
                                Actions
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {errorQrCodes ?
                        <>
                        {errorQrCodes.map((code, index) => (
                            <tr key={index} className="bg-red-500/10 border-t dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-4 px-6 text-red-600">
                                    {code}
                                </td>
                            </tr>
                        ))}
                        </>
                    :
                        <>
                        {qrCodes.map((code, index) => (
                            <tr key={index} className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-2 px-6">
                                    {code}
                                </td>
                                <td className="py-2 px-6 text-right">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => onRemove(index)}
                                        className="text-red-600"
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </>
                    }
                </tbody>
            </table>
        </div>
    );
}

export default QRListTable