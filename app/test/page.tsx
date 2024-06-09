import axios from "axios";

const RFIDReaderPage = () => {
  const readRFID = async () => {
    const response = await axios.post('/api/sample');
    console.log(response.data);
  };

  return (
    <div>
      <button onClick={readRFID}>Read RFID</button>
    </div>
  );
};

export default RFIDReaderPage;