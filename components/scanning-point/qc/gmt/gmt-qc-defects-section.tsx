"use client"

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast as hotToast } from 'react-hot-toast';
import { Defect } from "@prisma/client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchOperatorsForOperation } from "@/actions/qc/fetch-operators-for-operation";
import QCSubmitDialogModel from "@/components/scanning-point/qc/qc-submit-dialog-model";
import GmtQcQrDetails from "@/components/scanning-point/qc/gmt/gmt-qc-qr-details";
import GmtQcQrScanningDialogModel from "@/components/scanning-point/qc/gmt/gmt-qc-qr-scanning-dialog-model";

interface GmtQCDefectsSectionProps {
    part: string;
    obbSheetId: string;
    qcPointId: string | undefined;
    defects: Defect[] | undefined;
    obbOperations: ActiveObbOperationsResType;
}

type OperationDataType = {
    operationId: string;
    operators: OperatorsForOperationResType;
    selectedOperatorId: string;
    defects: string[];
}

const GmtQCDefectsSection = ({
    part,
    obbSheetId,
    qcPointId,
    defects,
    obbOperations
}: GmtQCDefectsSectionProps) => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [gmtData, setGmtData] = useState<SchemaGmtDataType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [operationData, setOperationData] = useState<OperationDataType[]>([]);
    const [activeOperationId, setActiveOperationId] = useState<string | null>(null);

    const toggleDialog = () => setIsDialogOpen(prev => !prev);

    const handleGmtData = (data: SchemaGmtDataType) => setGmtData(data);

    useEffect(() => {
        // toggleDialog();
        setIsDialogOpen(true);
    }, [gmtData]);
    

    const handleSelectOperation = async (operationId: string) => {
        setActiveOperationId(operationId);

        // Check if the operation is already in the state, if not, fetch its details
        if (!operationData.find(op => op.operationId === operationId)) {
            const operators = await fetchOperatorsForOperation(operationId);
            const newOperation = {
                operationId,
                operators,
                selectedOperatorId: "",
                defects: [],
            };
            setOperationData(prev => [...prev, newOperation]);
        }
    }

    const handleSelectOperator = (operationId: string, operatorId: string) => {
        setOperationData(prev => prev.map(op => {
            if (op.operationId === operationId) {
                return { ...op, selectedOperatorId: operatorId };
            }
            return op;
        }).filter(op => op.selectedOperatorId !== "" || op.operationId === operationId));
    }

    const handleToggleDefect = (operationId: string, defectId: string) => {
        setOperationData(prev => prev.map(op => {
            if (op.operationId === operationId && op.selectedOperatorId) {
                const isAlreadySelected = op.defects.includes(defectId);
                return {
                    ...op,
                    defects: isAlreadySelected ? op.defects.filter(id => id !== defectId) : [...op.defects, defectId]
                };
            }
            return op;
        }));
    }

    const hasDefects: boolean = operationData.some(op => op.selectedOperatorId && op.defects.length > 0);

    const handleSubmit = async (status: string) => {
        setIsSubmitting(true);

        try {
            if (gmtData && qcPointId) {
                const validOperations = operationData.filter(op => op.selectedOperatorId && op.defects.length > 0);
                const payload: GmtQCPayloadDataType = {
                    gmtId: gmtData.id,
                    part: gmtData.partName === 'FRONT' ? 'front' : 'back',
                    qcPointId: qcPointId,
                    obbSheetId: obbSheetId,
                    qcStatus: status,
                    operations: validOperations.map(op => ({
                        obbOperationId: op.operationId,
                        operatorId: op.selectedOperatorId,
                        operatorName: op.operators.find(o => o.id === op.selectedOperatorId)?.name || "",
                        defects: op.defects,
                    })),
                };

                await axios.post(`/api/scanning-point/gmt-data/qc`, payload);
                hotToast.success("Saved the GMT QC status");
            } else {
                throw new Error("Required data missing");
            }
        } catch (error: any) {
            hotToast.error(error.response?.data || "Something went wrong");
        } finally {
            router.refresh();
            setGmtData(null);
            setOperationData([]);
            setActiveOperationId(null);
            setIsSubmitting(false);
            setIsDialogOpen(true);
        }
    };

    return (
        <div className='flex space-x-4'>
            <div className={gmtData ? 'w-5/6' : 'w-full'}>
                {gmtData ?
                    <div className="flex w-full border bg-slate-100 rounded-lg">
                        <div className="w-1/4 border-r">
                            <ScrollArea className='h-[720px]'>
                                <div className='grid grid-cols-1 gap-3 p-3'>
                                    {obbOperations.map((operation) => {
                                        const isSelected = operationData.some(op => op.operationId === operation.id && op.defects.length > 0);
                                        return (
                                            <div
                                                key={operation.id}
                                                className={cn(
                                                    "text-sm py-2 px-4 text-center min-h-14 flex items-center justify-center cursor-pointer rounded-sm border transition-all",
                                                    activeOperationId === operation.id ? "bg-green-500 text-white border-green-700 hover:opacity-85" :
                                                        isSelected ? "bg-green-600 text-white border-green-600 hover:opacity-85" : "text-slate-800 bg-[#0980D4]/10 border-[#0980D4]/20 hover:bg-[#0980D4]/20 hover:border-[#0980D4]/50"
                                                )}
                                                onClick={() => handleSelectOperation(operation.id)}
                                            >
                                                {operation.seqNo} - {operation.operationCode || "NO CODE"} - {operation.operationName}
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </div>

                        {operationData.length > 0 ? (
                            activeOperationId && (
                                operationData.filter(op => op.operationId === activeOperationId).map(op => (
                                    <React.Fragment key={op.operationId}>
                                        <div className="w-1/4 border-r">
                                            <ScrollArea className='h-[720px]'>
                                                <div className='grid grid-cols-1 gap-3 p-3'>
                                                    {op.operators.length > 0 ?
                                                        <>
                                                            {op.operators.map((operator) => (
                                                                <div
                                                                    key={operator.id}
                                                                    className={cn(
                                                                        "text-sm py-2 px-4 text-center min-h-14 flex items-center justify-center cursor-pointer rounded-sm border transition-all",
                                                                        op.selectedOperatorId === operator.id ? "bg-purple-600 text-white border-purple-600 hover:opacity-85" : "text-slate-800 bg-purple-600/10 border-purple-600/20 hover:bg-purple-600/20 hover:border-purple-600/50"
                                                                    )}
                                                                    onClick={() => handleSelectOperator(op.operationId, operator.id)}
                                                                >
                                                                    {operator.name}
                                                                </div>
                                                            ))}
                                                        </>
                                                        :
                                                        <p className="text-center text-sm mt-2 text-slate-500">No operators found for this operation!</p>
                                                    }
                                                </div>
                                            </ScrollArea>
                                        </div>
                                        <div className="w-1/2">
                                            <ScrollArea className='h-[720px]'>
                                                <div className='grid grid-cols-3 gap-3 p-3'>
                                                    {defects?.map((defect) => (
                                                        <div
                                                            key={defect.id}
                                                            className={cn(
                                                                "text-sm py-2 px-4 text-center min-h-14 flex items-center justify-center cursor-pointer rounded-sm border transition-all",
                                                                op.defects.includes(defect.id) ? "bg-orange-600 text-white border-orange-600 hover:opacity-85" : "text-slate-800 bg-[#0980D4]/10 border-[#0980D4]/20 hover:bg-[#0980D4]/20 hover:border-[#0980D4]/50",
                                                                !op.selectedOperatorId && "opacity-50 cursor-not-allowed"
                                                            )}
                                                            onClick={() => {
                                                                if (op.selectedOperatorId) {
                                                                    handleToggleDefect(op.operationId, defect.id);
                                                                }
                                                            }}
                                                        >
                                                            {defect.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </React.Fragment>
                                ))
                            )
                        ) : (
                            // Defects are shown but disabled if no operation or operator is selected
                            <div className="w-3/4">
                                <ScrollArea className='h-[720px]'>
                                    <div className='grid grid-cols-3 gap-3 p-3'>
                                        {defects?.map((defect) => (
                                            <div
                                                key={defect.id}
                                                className="text-sm py-2 px-4 text-center min-h-14 flex items-center justify-center cursor-not-allowed rounded-sm border transition-all text-slate-800 bg-[#0980D4]/10 border-[#0980D4]/20 opacity-50"
                                            >
                                                {defect.name}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </div>

                    :
                    <div className='bg-slate-50 p-14 rounded-lg'>
                        <div
                            className="h-[420px] flex flex-col justify-center items-center bg-slate-100/80 text-slate-500 rounded-lg border border-[#0980D4]/50 border-dashed cursor-pointer"
                            onClick={toggleDialog}
                        >
                            <Image src='/images/scanning-files.gif' alt="Scanning" width={600} height={200} className="mt-2 w-3/5 rounded-md" />
                            <p className="absolute bg-white/50 px-2 py-1 rounded-md mt-2 font-semibold text-2xl text-[#0980D4]">🫵 Press here to scan QR</p>
                        </div>
                    </div>
                }
            </div>
            <div className={cn('w-1/6 space-y-4', !gmtData && 'hidden')}>
            <GmtQcQrScanningDialogModel
                part={part}
                isOpen={isDialogOpen}
                toggleDialog={toggleDialog}
                handleGmtData={handleGmtData}
                handleSubmit={handleSubmit}
            />
                {gmtData &&
                    <>
                        {/* <GmtQcQrScanningDialogModel
                            part={part}
                            isOpen={isDialogOpen}
                            toggleDialog={toggleDialog}
                            handleGmtData={handleGmtData}
                            handleSubmit={handleSubmit}
                        /> */}
                        <QCSubmitDialogModel
                            handleSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            isQcStatusPass={!hasDefects}
                        />
                        <GmtQcQrDetails
                            gmtBarcode={gmtData.gmtBarcode}
                            color={gmtData.color}
                            partName={gmtData.partName}
                            size={gmtData.size}
                            style={gmtData.styleNo}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default GmtQCDefectsSection