"use client"

import { cmdDeviceRegistryContinuesTagID, devicePortBind, devicePortOpenReadSerialData } from "@/lib/rfidService";

interface Props {
  tagId: string | null;
}

const RFIDReaderPage = ({ tagId }: Props) => {
  return (
    <div>
      <h1>RFID Tag Reader</h1>
      {tagId ? <p>Last Read Tag ID: {tagId}</p> : <p>No Tag Read Yet</p>}
    </div>
  )
};

export const saplmeNAe = () => {
  devicePortBind();
  cmdDeviceRegistryContinuesTagID();
  devicePortOpenReadSerialData();

  RFIDReaderPage({ tagId: 'hhhh' });
};

export default saplmeNAe;