// Since you are using require, you must explicitly type the imports or use any if types are not available.
const SerialPort = require('serialport') as typeof import('serialport').SerialPort;
const { DelimiterParser } = require('@serialport/parser-delimiter');

// If the types are not available you might define minimal ones or use any.
interface DeviceInfo {
    Port: string;
    baudRate: number;
}

const deviceInfo: DeviceInfo = require('./deviceInfo.json');

// Using any for types where explicit types are not available
let bindSerialPort: any;
let parser: any;
let readBuffer: string | undefined;
let uniquecmd: Buffer = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

function devicePortBind(): void {
    bindSerialPort = new SerialPort({
        path: deviceInfo.Port,
        baudRate: deviceInfo.baudRate
    });
    parser = bindSerialPort.pipe(new (DelimiterParser as any)({ delimiter: '\n' }));
}

function cmdDeviceRegistryContinuesTagID(): void {
    bindSerialPort.on('open', function (err: Error | null): void {
        console.log('open port', err);
        bindSerialPort.write(uniquecmd, function (err: Error | null): void {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
        });
    });
}

function devicePortOpenReadSerialData(): void {
    bindSerialPort.on('open', function (err: Error | null): void {
        console.log('open!');
        parser.on('data', function (data: string): void {
            if (data.length > 2) {
                readBuffer = Buffer.from(data).toString('hex', 7, 19);

                console.log("Tag :", readBuffer);

                bindSerialPort.close(function (err: Error | null): void {
                    console.log('port closed', err);
                });
            }
        });
    });
}

devicePortBind();
cmdDeviceRegistryContinuesTagID();
devicePortOpenReadSerialData();