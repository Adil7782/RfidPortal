"use client"

import { connectRFIDReader } from "@/actions/rfidReader";

const TestPage = () => {

    const handleConnect =() => {
        connectRFIDReader().then(() => {
            console.log("Connection attempt finished.");
          });
    }
  return (
    <button onClick={handleConnect}>Connect to RFID Reader</button>
  )
}

export default TestPage