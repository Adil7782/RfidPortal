import { NextResponse } from "next/server";
import { SerialPort } from 'serialport';
import { DelimiterParser } from '@serialport/parser-delimiter';

import deviceInfo from '@/device-info.json';

type DeviceInfo = {
    serialNumber?: string;
    productId?: string;
    vendorId?: string;
    baudRate: number;
    Port: string;
};

let bindSerialPort: SerialPort;
let parser: DelimiterParser;

// Initialize the RFID reader
const initializeReader = (deviceInfo: DeviceInfo) => {
    bindSerialPort = new SerialPort({
        path: deviceInfo.Port,
        baudRate: deviceInfo.baudRate,
        autoOpen: false
    });

    parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: '\n' }));
};

export async function POST(
    req: Request,
) {
    try {
        const { command } = await req.json();
        if (command === 'start') {
            initializeReader(deviceInfo);

            bindSerialPort.open((err) => {
                if (err) {
                    console.error('Error opening port: ', err.message);
                    return new NextResponse("Failed to open port", { status: 501 });
                }
                console.log('RFID reading started.');

                const stream = new ReadableStream({
                    start(controller) {
                        parser.on('data', (data) => {
                            const tag = `data: ${data.toString()}\n\n`;
                            controller.enqueue(new TextEncoder().encode(tag));
                        });

                        bindSerialPort.on('close', () => {
                            console.log('Stream closed');
                            controller.close();
                        });
                    }
                });

                return new Response(stream, {
                    headers: {
                        'Content-Type': 'text/event-stream',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive'
                    },
                    status: 200
                });
            });
        } else if (command === 'stop') {
            if (bindSerialPort.isOpen) {
                bindSerialPort.close((err) => {
                    if (err) {
                        console.error('Error closing port: ', err.message);
                        return NextResponse.rewrite('/error');  // Redirect or handle the error appropriately
                    }
                    console.log('RFID reading stopped.');
                    return new NextResponse("RFID reading stopped!", { status: 200 });
                });
            }
        }
        return new NextResponse("Pass the command with API request!", { status: 502 });
    } catch (error) {
        console.error("[READ_RFID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}