// import SerialPort from 'serialport';
// import { DelimiterParser } from '@serialport/parser-delimiter';
// import deviceinfo from '@/device-info.json';

// let uniquecmd: Buffer = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

// // Function to bind to the serial port
// export const devicePortBind = () => {
//     const bindSerialPort = new SerialPort({
//         path: deviceinfo.Port,
//         baudRate: deviceinfo.baudRate
//     });

//     const parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: '\n' }));
//     return { bindSerialPort, parser };
// };

// export const cmdDeviceRegistryContinuesTagID = (bindSerialPort: any): void => {
//     bindSerialPort.on('open', (err: Error | null | undefined) => {
//         if (err) {
//             console.error('Error opening port:', err.message);
//             return;
//         }

//         bindSerialPort.write(uniquecmd, (err: Error | null | undefined) => {
//             if (err) {
//                 console.error('Error on write:', err.message);
//             }
//         });
//     });
// };

// export const devicePortOpenReadSerialData = (bindSerialPort: any, parser: any): void => {
//     bindSerialPort.on('open', () => {
//         console.log('Port opened for reading');
//         parser.on('data', (data: Buffer) => {
//             if (data.length > 2) {
//                 const readBuffer = Buffer.from(data).toString('hex', 7, 19);
//                 console.log("Tag:", readBuffer);

//                 bindSerialPort.close((err: Error | null | undefined) => {
//                     if (err) console.error('Error closing port:', err.message);
//                     else console.log('Port closed after reading');
//                 });
//             }
//         });
//     });
// };