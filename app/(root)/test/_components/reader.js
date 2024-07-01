import readports from 'serialport';
import { DelimiterParser } from '@serialport/parser-delimiter';
import deviceinfo from './rfidDeviceInfo.json';

let bindSerialPort = NaN;
let parser = NaN;

let uniquecmd = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

export function devicePortBind(){
    bindSerialPort = new readports.SerialPort({
        path: deviceinfo.Port,
        baudRate: deviceinfo.baudRate
    });
    parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: '\n' }));     // Use the Readline parser for easy reading
}

export function cmdDeviceRegistryContinuesTagID(){
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
}

export function devicePortOpenReadSerialData(){
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
}