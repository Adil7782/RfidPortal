// const {devicePortBind , cmdDeviceRegistryContinuesTagID , devicePortOpenReadSerialData} = require('./serialService');
import {devicePortBind , cmdDeviceRegistryContinuesTagID , devicePortOpenReadSerialData} from './serialService';

devicePortBind();
cmdDeviceRegistryContinuesTagID();
devicePortOpenReadSerialData();