export async function connectRFIDReader() {
    if (!("serial" in navigator)) {
      console.error("Web Serial API not supported in this browser.");
      alert("Web Serial API not supported in this browser.");
      return;
    }
  
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      console.log("Port opened:", port);
  
      // Set up the reader using TextDecoderStream for text-based RFID data
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
          // Log the RFID tag value to the console
          console.log(`Received RFID tag: ${value}`);
          // Here you can also handle the RFID data, for example, verify it or use it to look up details in a database
        }
      } catch (error) {
        console.error(`Error reading data: ${error}`);
      } finally {
        reader.releaseLock();
      }
  
      // Close the port when done
      await port.close();
      console.log("Port closed");
    } catch (error) {
      console.error("Failed to connect to the RFID reader:", error);
    }
  }
  