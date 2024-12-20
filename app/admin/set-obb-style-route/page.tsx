"use client"

import { useState } from 'react';
import { ObbSheetRoute } from '@prisma/client';

import SelectObbSheet from '@/components/forms/select-obb-sheet';
import { fetchObbRoute } from './_actions/fetch-obb-route';
import MultiSelectRoutesForObb from './_components/multi-select-routes-for-obb';

const SetObbStyleRoutePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedObbSheet, setSelectedObbSheet] = useState<ObbSheetDetailsType | null>(null);
    const [defaultObbRoute, setDefaultObbRoute] = useState<ObbSheetRoute | null>(null);

    const handleSelectObbSheet = async (obbSheet: ObbSheetDetailsType) => {
        setIsLoading(true);
        setSelectedObbSheet(obbSheet);
        const route = await fetchObbRoute(obbSheet.id);
        setDefaultObbRoute(route);
        setIsLoading(false);
    }

    return (
        <div className='mt-8 mx-auto max-w-7xl'>
            <SelectObbSheet handleSelectObb={handleSelectObbSheet} />
            <div className='mt-8'>
                {selectedObbSheet ?
                    isLoading ?
                        <div className='text-center text-slate-500'>
                            Loading...
                        </div>
                        :
                        <MultiSelectRoutesForObb route={defaultObbRoute} obbSheetId={selectedObbSheet.id}/>
                    :
                    <div className='text-center text-slate-500'>
                        Please select an OBB Sheet to set the target.
                    </div>
                }
            </div>
        </div>
    )
}

export default SetObbStyleRoutePage