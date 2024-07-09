"use client"

import { connectRFIDReader } from "@/actions/rfidReader";

const TestPage = () => {

    const handleConnect =() => {
        connectRFIDReader().then(() => {
            console.log("Connection attempt finished.");
          });
    }
  return (
    <button className="p-2 mt-8 bg-slate-200 mx-auto" onClick={handleConnect}>Connect to RFID Reader</button>
  )
}

export default TestPage