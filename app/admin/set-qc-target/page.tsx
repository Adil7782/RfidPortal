"use client"

import { useState } from 'react';
import { ObbQcTarget } from '@prisma/client';

import SelectObbSheet from '@/components/forms/select-obb-sheet';
import SetObbQcTargetForm from './_components/set-obb-qc-target-form';
import { fetchObbQcTargetsDetails } from './_actions/fetch-obb-qc-targets-details';

const SetQcTarget = () => {
    const [selectedObbSheet, setSelectedObbSheet] = useState<ObbSheetDetailsType | null>(null);
    const [defaultTargets, setDefaultTargets] = useState<ObbQcTarget | null>(null);

    const handleSelectObbSheet = async (obbSheet: ObbSheetDetailsType) => {
        const targets = await fetchObbQcTargetsDetails(obbSheet.id);
        if (targets) {
            setDefaultTargets(targets);
        }
        setSelectedObbSheet(obbSheet);
    }

    return (
        <div className='mt-8'>
            <SelectObbSheet handleSelectObb={handleSelectObbSheet} />
            <div className='mt-8'>
                {selectedObbSheet ?
                    <SetObbQcTargetForm obbSheet={selectedObbSheet} initialData={defaultTargets}/>
                    :
                    <div className='text-center text-slate-500'>
                        Please select an OBB Sheet to set the target.
                    </div>
                }
            </div>
        </div>
    )
}

export default SetQcTarget