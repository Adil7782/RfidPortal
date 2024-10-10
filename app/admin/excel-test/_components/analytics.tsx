"use client"
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import ExportWithTemplate from './read-templat';
import ExportExcel from './read-templat';
import SelectObbSheetAndDate from './select-obbsheet-and-date';
import { toast } from '@/components/ui/use-toast';
import { getData } from '../action';

const Analytics = () => {

    
  // const handleDownloadExcel = () => {
  //   // Create a worksheet from the data
  //   const worksheet = XLSX.utils.json_to_sheet(data.data);
  //   const headers = [
  //       { A1: "Target vs Achivement", A2: "Day Target 1A", B1: "Header 2", B2: "Subheader 2A" },
  //     ];

  //   // Create a new workbook and add the worksheet
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'ProductionData');

  //   // Generate the Excel file and trigger download
  //   XLSX.writeFile(workbook, 'production_data.xlsx');
  // };
  
  const [date,setDate] = useState<string>("")
  const [data,setData] = useState<string>("")

  
  const handleFetchProductions = async (data: {  date: Date }) => {
    try {
        data.date.setDate(data.date.getDate() + 1);
        const formattedDate = data.date.toISOString().split('T')[0].toString() + "%";
        
        console.log(formattedDate)
        // setObbSheetId(data.obbSheetId);
        setDate(formattedDate);
        // setFilterApplied(true);

        // Directly refresh the router after updating the state.
        // router.refresh();
    } catch (error: any) {
        console.error("Error fetching production data:", error);
        toast({
            title: "Something went wrong! Try again",
            variant: "error",
            description: (
                <div className='mt-2 bg-slate-200 py-2 px-3 md:w-[336px] rounded-md'>
                    <code className="text-slate-800">
                        ERROR: {error.message}
                    </code>
                </div>
            ),
        });
    }
};


const getDetails = async ()=> {
  const data :any= await getData(date)
  setData(data)

}

useEffect(()=>{
  getDetails()
},[date])


  return (

    
    <div>
      {/* <h1>Export Excel Example</h1> */}
      <SelectObbSheetAndDate handleSubmit={handleFetchProductions}></SelectObbSheetAndDate>
      <ExportExcel  dataa={data}></ExportExcel>
    </div>

    
  )
}

export default Analytics