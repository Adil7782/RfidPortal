import { NextResponse } from "next/server";
import { SerialPort } from 'serialport';
import { DelimiterParser } from '@serialport/parser-delimiter';
import deviceinfo from './rfidDeviceInfo.json';

let bindSerialPort;
let parser;
let uniquecmd = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

const devicePortBind = () => {
    bindSerialPort = new SerialPort({
        path: deviceinfo.Port,
        baudRate: deviceinfo.baudRate
    });
    parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: '\n' }));
};

const cmdDeviceRegistryContinuesTagID = () => {
    return new Promise((resolve, reject) => {
        bindSerialPort.on('open', function(err) { 
            if (err) {
                console.error('OPEN_PORT_ERROR:', err);
                return reject(err);
            }
            console.log('Port opened');
            bindSerialPort.write(uniquecmd, function(err){
                if (err) {
                    reject('Error on write: ' + err.message);
                } else {
                    resolve();
                }
            });
        });
    });
};

const devicePortOpenReadSerialData = () => {
    return new Promise((resolve, reject) => {
        parser.on('data', function(data) {
            if (data.length > 2) {
                const readBuffer = Buffer.from(data).toString('hex', 7, 19);
                console.log("RFID Tag:", readBuffer);
                bindSerialPort.close(function(err) {
                    if (err) {
                        reject('Error closing port: ' + err.message);
                    } else {
                        console.log('Port closed');
                        resolve(readBuffer);
                    }
                });
            }
        });

        bindSerialPort.on('error', function(err) {
            reject('Port error: ' + err.message);
        });
    });
};

export async function GET() {
    try {
        console.log("Working");

        devicePortBind();
        await cmdDeviceRegistryContinuesTagID();
        const tagId = await devicePortOpenReadSerialData();
        console.log("TAGGGG:", tagId);

        return NextResponse.json({ data: tagId, message: 'Scanning point is created successfully!'}, { status: 201 });
    } catch (error) {
        console.error("[READER_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}