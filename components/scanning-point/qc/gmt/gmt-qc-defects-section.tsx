"use client"

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast as hotToast } from 'react-hot-toast';
import { Defect } from "@prisma/client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchOperatorsForOperation } from "@/actions/qc/fetch-operators-for-operation";
import QCSubmitDialogModel from "@/components/scanning-point/qc/qc-submit-dialog-model-2";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    const inputRef = useRef<HTMLInputElement>(null);

    const [qrData, setQrData] = useState('');
    const [updatedGmtDefectId, setUpdatedGmtDefectId] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [operationData, setOperationData] = useState<OperationDataType[]>([]);
    const [activeOperationId, setActiveOperationId] = useState<string | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent the default 'Enter' action
            const scannedValue = event.currentTarget.value.trim();
            if (scannedValue) {
                if (part === 'front') {
                    if (scannedValue.endsWith('B')) {   // Handle validation for BACK QR Codes
                        hotToast.error("You are scanning a BACK QR code, Please scan FRONT QR!");
                    } else if (scannedValue.endsWith('F')) {
                        if (!qrData) {
                            setQrData(scannedValue);
                            handlePassQcStatus(scannedValue);
                        } else if (qrData !== scannedValue) {
                            setQrData(scannedValue);
                            handlePassQcStatus(scannedValue);
                        } else {
                            hotToast("You're scanning the same QR", { icon: '👎' })
                        }
                    } else {
                        hotToast.error("Invalid QR Code, Please try again");
                    }
                } else if (part === 'back') {
                    if (scannedValue.endsWith('B')) {
                        if (!qrData) {
                            setQrData(scannedValue);
                            handlePassQcStatus(scannedValue);
                        } else if (qrData !== scannedValue) {
                            setQrData(scannedValue);
                            handlePassQcStatus(scannedValue);
                        } else {
                            hotToast("You're scanning the same QR", { icon: '👎' })
                        }
                    } else if (scannedValue.endsWith('F')) {   // Handle validation for FRONT QR Codes
                        hotToast.error("You are scanning a FRONT QR code, Please scan BACK QR!");
                    } else {
                        hotToast.error("Invalid QR Code, Please try again");
                    }
                }
            }
            event.currentTarget.value = '';  // Clear the input for the next scan
        }
    };

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

    const handlePassQcStatus = async (gmtBarcode: string) => {
        setIsSubmitting(true);
        try {
            const payload = {
                gmtBarcode,
                part,
                qcPointId,
                obbSheetId,
            }
            const res = await axios.post(`/api/scanning-point/gmt-data/qc/create`, payload);
            if (res.data) {
                setUpdatedGmtDefectId(res.data.gmtDefectId);
                hotToast.success("QC Passed the Garment");
            }
            router.refresh();
        } catch (error: any) {
            console.error("GMT QC PASS ERROR", error);
            hotToast.error(error.response?.data || "Something went wrong");
        }
        setIsSubmitting(false);
        inputRef.current?.focus();
    };

    const handleRejectReworkQcStatus = async (status: string) => {
        setIsSubmitting(true);
        if (updatedGmtDefectId) {
            const validOperations = operationData.filter(op => op.selectedOperatorId && op.defects.length > 0);
            const payload = {
                id: updatedGmtDefectId,
                qcStatus: status,
                operations: validOperations.map(op => ({
                    obbOperationId: op.operationId,
                    operatorId: op.selectedOperatorId,
                    operatorName: op.operators.find(o => o.id === op.selectedOperatorId)?.name || "",
                    defects: op.defects,
                })),
            }
            await axios.put(`/api/scanning-point/gmt-data/qc/update`, payload);
            hotToast.success("Updated GMT QC status");
            setOperationData([]);
            setActiveOperationId(null);
            router.refresh();
        } else {
            hotToast.error("No defects selected, Please select Operation and Defects");
        }
        setIsSubmitting(false);
        inputRef.current?.focus();
    }

    const hasDefects: boolean = operationData.some(op => op.selectedOperatorId && op.defects.length > 0);

    return (
        <div className='flex gap-x-4'>
            {/* QR input listener */}
            <input
                ref={inputRef}
                type="text"
                onKeyDown={handleKeyPress}
                aria-hidden="true"
                className='opacity-0 absolute top-[-1000]'
            />

            <div className="w-5/6">
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
            </div>
            <div className='w-1/6 space-y-4'>
                {isSubmitting ?
                    <div className="bg-[#f9f7f1] w-full h-44 flex flex-col justify-center items-center border rounded-lg">
                        <Loader2 className="animate-spin w-7 h-7" />
                        <span className="mt-1 text-sm text-slate-500">Updating...</span>
                    </div>
                    :
                    <div className="space-y-3">
                        <Image
                            src='/images/scanning-qr2.gif'
                            alt="scanning qr"
                            width={600}
                            height={200}
                            className="mt-2 p-2 bg-[#f9f7f1] w-full rounded-lg border"
                        />
                        <Button variant="secondary" className="w-full" onClick={() => inputRef.current?.focus()}>
                            Press to scan QR
                        </Button>
                    </div>
                }
                {qrData &&
                    <div>
                        <Separator />
                        <p className="mt-2 px-2 py-1 bg-slate-200 text-center rounded-full border border-slate-400 ">{qrData}</p>
                        <Separator className="mt-2 mb-4" />
                        <QCSubmitDialogModel
                            handleSubmit={handleRejectReworkQcStatus}
                        // isDisabled={isSubmitting || !updatedGmtDefectId || !hasDefects}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default GmtQCDefectsSection