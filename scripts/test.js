const dd = require('./serialService');

dd.devicePortBind(); // port  bind baudrate,start,end bits, port location " one time declartion this frame"
dd.cmdDeviceRegistryContinuesTagID(); // device request registry "one time declartion this frame"
dd.devicePortOpenReadSerialData(); // tag data read and set interface variable "request response function"