import * as dd from './serialService';

dd.devicePortBind(); // Port bind baudrate, start, end bits, port location "one time declaration this frame"
dd.cmdDeviceRegistryContinuesTagID(); // Device request registry "one time declaration this frame"
dd.devicePortOpenReadSerialData(); // Tag data read and set interface variable "request response function"