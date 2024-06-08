const  readports = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter')
const deviceinfo = require('./deviceInfo.json');

let bindSerialPort = NaN;
let parser = NaN;
let readBuffer = NaN;
let uniquecmd = Buffer.from([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);


function devicePortBind(){
    bindSerialPort = new readports.SerialPort(
        {
          path: deviceinfo.Port,
          baudRate: deviceinfo.baudRate
        }
    );
    parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: '\n' }));
}

function cmdDeviceRegistryContinuesTagID(){
    bindSerialPort.on('open',function(err){ 
        console.log('open port', err);
        bindSerialPort.write(uniquecmd, function(err){
            if (err) {
            return console.log('Error on write: ', err.message);
            }
        });
    });
}

function devicePortOpenReadSerialData(){
    bindSerialPort.on('open',function(err){ // conti check code b 0xe6
        console.log('open!');
        parser.on('data',function(data){
            if(data.length > 2 ){
                readBuffer = Buffer.from(data).toString('hex',7,19);

                console.log("Tag :",readBuffer); //add interface display area code ex:-  document.getElementById("App").innerHTML = data;

                bindSerialPort.close(function (err) {
                    console.log('port closed');
                }); 
            }     
        });
    });
}

module.exports = {devicePortBind , cmdDeviceRegistryContinuesTagID , devicePortOpenReadSerialData};