// const dd = require('./serialService');
import * as dd from './serialService';

dd.devicePortBind();
dd.cmdDeviceRegistryContinuesTagID();
dd.devicePortOpenReadSerialData();