const readports = require("serialport");
const { DelimiterParser } = require("@serialport/parser-delimiter");
let bindSerialPort = NaN;
let parser = NaN;

let rfid_tags = [];

let fast_switch_ant = Buffer.from([
  0xa0, 0x0d, 0x01, 0x8a, 0x00, 0x0a, 0x01, 0x0a, 0x02, 0x0a, 0x03, 0x0a, 0x01, 0x0a, 0x8f,
]);

const deviceinfo = require("./deviceInfo.json");

function devicePortBind() {
  bindSerialPort = new readports.SerialPort({
    path: deviceinfo.Port,
    baudRate: deviceinfo.baudRate,
  });
  parser = bindSerialPort.pipe(new DelimiterParser({ delimiter: "\n" }));
}

function cmdDeviceRegistryContinuesTagID() {
  bindSerialPort.on("open", function (err) {
    console.log("open port", err);
    //bindSerialPort.write(setAddress)
    bindSerialPort.write(fast_switch_ant, function (err) {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
    });
  });
}

function devicePortOpenReadSerialData() {
  bindSerialPort.on("open", function (err) {
    console.log("open!");
    parser.on("data", function (data) {
      console.log(data);
      if (data.length > 0) {
        const readBuffer = Buffer.from(data).toString("hex");
        // const getRfid = /e280.{21}/g;
        const getRfid = /e28069150000.{12}/g;
        const newRfid = readBuffer.match(getRfid);

        if (newRfid) {
          for (const match of newRfid) {
            if (!rfid_tags.includes(match)) {
              rfid_tags.push(match);
            }
          }
        }
      }
      console.log(rfid_tags);
      const rfidCount = rfid_tags.length;
      console.log("RFID Tag Count: " + rfidCount);
    });
  });
}

module.exports = {
  devicePortBind,
  cmdDeviceRegistryContinuesTagID,
  devicePortOpenReadSerialData
};
