// const dd = require('./serialService');

// dd.devicePortBind();
// dd.cmdDeviceRegistryContinuesTagID();
// dd.devicePortOpenReadSerialData();

import { 
    devicePortBind, 
    cmdDeviceRegistryContinuesTagID, 
    devicePortOpenReadSerialData 
} from "./serial-service";

devicePortBind();
cmdDeviceRegistryContinuesTagID();
devicePortOpenReadSerialData();