import { 
    devicePortBind, 
    cmdDeviceRegistryContinuesTagID, 
    devicePortOpenReadSerialData 
} from "./serial-service";

devicePortBind();
cmdDeviceRegistryContinuesTagID();
devicePortOpenReadSerialData();