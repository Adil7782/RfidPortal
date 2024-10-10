"use client"
import React from 'react'
import * as XLSX from 'xlsx';
import ExportWithTemplate from './read-templat';
import ExportExcel from './read-templat';

const Analytics = ({data}:any) => {

    
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
  const sampleData = [
    { seqNo: "001", name: "Operation A", date: "2024-10-01", count: 100 },
    { seqNo: "002", name: "Operation B", date: "2024-10-01", count: 150 },
    { seqNo: "003", name: "Operation C", date: "2024-10-01", count: 200 },
  ];



  return (

    
    <div>
      <h1>Export Excel Example</h1>
      <ExportExcel data={data}></ExportExcel>
    </div>

    
  )
}

export default Analytics