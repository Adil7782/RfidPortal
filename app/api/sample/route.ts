// import { cmdDeviceRegistryContinuesTagID, devicePortBind, devicePortOpenReadSerialData } from "@/lib/rfid";
// import { NextResponse } from "next/server";

// export async function POST(
//     req: Request,
// ) {
//     try {
//         const { bindSerialPort, parser } = devicePortBind();
//         cmdDeviceRegistryContinuesTagID(bindSerialPort);
//         devicePortOpenReadSerialData(bindSerialPort, parser);

//         return new NextResponse("RFID reading initiated", { status: 201 });
//     } catch (error) {
//         console.error("[READ_RFID]", error);
//         return new NextResponse("Internal Error", { status: 500 });
//     }
// }