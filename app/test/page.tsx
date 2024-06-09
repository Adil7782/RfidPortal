import { cmdDeviceRegistryContinuesTagID, devicePortBind, devicePortOpenReadSerialData } from '@/lib/serialService';

const TestPage = () => {
  devicePortBind();
  cmdDeviceRegistryContinuesTagID();
  devicePortOpenReadSerialData();

  return (
    <div>TestPage</div>
  )
}

export default TestPage