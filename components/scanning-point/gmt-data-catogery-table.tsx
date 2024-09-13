"use client"

import { useEffect, useState } from 'react';
import { GmtData } from '@prisma/client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchGmtDataForLineIN } from '@/actions/fetch-gmt-data-for-line-in';
import { Loader2 } from 'lucide-react';

type CategorizedDataType = {
    po: string;
    styleNo: string;
    color: string;
    size: string;
    quantity: number;
};

const GmtDataCategoryTable = ({ part }: { part: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [gmtData, setGmtData] = useState<CategorizedDataType[]>([]);

    const categorizeData = (data: GmtData[]): CategorizedDataType[] => {
        const categoryMap = new Map<string, CategorizedDataType>();

        data.forEach(item => {
            const categoryKey = `${item.po}-${item.styleNo}-${item.color}-${item.size}`;
            const existingEntry = categoryMap.get(categoryKey);

            if (existingEntry) {
                existingEntry.quantity++;
            } else {
                categoryMap.set(categoryKey, {
                    po: item.po || "",
                    styleNo: item.styleNo,
                    color: item.color,
                    size: item.size,
                    quantity: 1
                });
            }
        });

        return Array.from(categoryMap.values());
    };

    useEffect(() => {
        const fetchAndCategorizeData = async () => {
            setIsLoading(true);
            const fetchedData = await fetchGmtDataForLineIN(part);
            const categorizedData = categorizeData(fetchedData);
            setGmtData(categorizedData);
            setIsLoading(false);
        };
        fetchAndCategorizeData();
    }, []);

    return (
        <div className='w-full border flex flex-row p-4'>
            {!isLoading ?
                <Table className="w-full qr-table">
                    <TableHeader>
                        <TableRow className="primary-bg hover:bg-slate-700">
                            <TableHead className="text-white text-center">PO</TableHead>
                            <TableHead className="text-white text-center">Style</TableHead>
                            <TableHead className="text-white text-center">Color</TableHead>
                            <TableHead className="text-white text-center">Size</TableHead>
                            <TableHead className="text-white text-center">Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {gmtData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{data.po}</TableCell>
                                <TableCell className="text-center">{data.styleNo}</TableCell>
                                <TableCell className="text-center">{data.color}</TableCell>
                                <TableCell className="text-center">{data.size}</TableCell>
                                <TableCell className="text-center">{data.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                :
                <div className="flex w-full justify-center items-center h-40 bg-slate-100 border rounded-lg">
                    <Loader2 className="animate-spin w-8 h-8 text-slate-500" />
                </div>
            }
        </div>
    )
}

export default GmtDataCategoryTable