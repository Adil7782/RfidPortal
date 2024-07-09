export async function connectRFIDReader() {
    try {
      // Request the port
      const port = await window.navigator.serial.requestPort();
      
      // Open the port with specified baudRate
      await port.open({ baudRate: 115200 });
      
      console.log("Port opened:", port);
  
      // Set up the reader
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
  
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Reader has been canceled or the stream has been closed by the device
            console.log("Stream closed by the device");
            break;
          }
          console.log(`Received data: ${value}`);
          // Process the data (value) received from the RFID reader here
        }
      } catch (error) {
        console.error(`Error reading data: ${error}`);
      } finally {
        reader.releaseLock();
      }
  
      // Close the port
      await port.close();
      console.log("Port closed");
    } catch (error) {
      console.error("Failed to connect to the RFID reader:", error);
    }
  }
  