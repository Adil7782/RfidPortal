// Importing required modules using require instead of import
const readports = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter');
const deviceinfo = require('@/device-info.json');


// Declaring variables with appropriate types
let bindSerialPort: ReturnType<typeof readports>;
let parser: ReturnType<typeof DelimiterParser>;
let readBuffer: string;
let uniquecmd: Buffer = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

// Function to bind to the serial port
function devicePortBind() {
    bindSerialPort = new readports.SerialPort({
        path: deviceinfo.Port,
        baudRate: deviceinfo.baudRate
    });
    parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: '\n' }));
}

// Function to send a registry command to the device
function cmdDeviceRegistryContinuesTagID() {
    bindSerialPort.on('open', function(err: Error | null) {
        console.log('open port', err);
        bindSerialPort.write(uniquecmd, function(err: Error | null) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
        });
    });
}

// Function to open the serial port and read serial data
function devicePortOpenReadSerialData() {
    bindSerialPort.on('open', function(err: Error | null) {
        console.log('open!');
        parser.on('data', function(data: Buffer) {
            if (data.length > 2) {
                readBuffer = data.toString('hex', 7, 19);

                console.log("Tag :", readBuffer); // Add interface display area code ex:-  document.getElementById("App").innerHTML = data;

                bindSerialPort.close(function(err: Error | null) {
                    console.log('port closed', err);
                });
            }
        });
    });
}

// Calling the functions to initialize and start the RFID reading process
devicePortBind();
cmdDeviceRegistryContinuesTagID();
devicePortOpenReadSerialData();
