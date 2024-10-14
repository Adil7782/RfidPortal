"use client";
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getData } from './action';
import TableComponent from './TableComponent';


interface AnalyticsChartProps {
  obbSheets: {
    id: string;
    name: string;
  }[] | null;
}

export type ProductionDataType = {
  name: string;
  count: number;
  target: number;
  employeeId: string;
  machineId: string;
  eliotSerialNumber: string;
  code: string;
  operationname: string;
  totprod: number;
  LoginTimestamp: string;
  LogoutTimestamp: string;

};

export type ProductionDetailsType = {
    backQcTarget: number;
    dailyPlanEfficiency: number;
    date: string;
    endQcTarget: number;
    frontQcTarget: number;
    id: string;
    lineName: string;
    obbHelpers: number;
    obbIronOperators: number;
    obbManPowers: number;
    obbSewingOperators: number;
    obbSheetId: string;
    style: string;
    targetEfficiency: number;
    targetWorkingHours: number;
    totalSMV: number;
    unitName: string;
    utilizedHelpers: number;
    utilizedIronOperators: number;
    utilizedMachines: number;
    utilizedManPowers: number;
    utilizedSewingOperators: number;
    workingHours: number;
  };

const LogTable = () => {
  const [date, setDate] = useState<string>("");
  const [obbSheetId, setObbSheetId] = useState<string>("");

  const [data, setData] = useState<ProductionDetailsType[]>([]);


  

  

  const getDetails = async () => {

    const details = await getData();
    console.log("details", details);
    setData(details)

  };

  useEffect(() => {
   
    getDetails();
  }, []);

  return (

    <div>
      
      <div className="mx-auto max-w-7xl">

      </div>
      <Card x-chunk="dashboard-05-chunk-3">
      


        <CardContent>
          <TableComponent data={data}></TableComponent>

        </CardContent>
      </Card>
    </div>

  )
}

export default LogTable