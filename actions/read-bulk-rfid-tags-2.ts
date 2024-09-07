let keepReading = true;
let port: SerialPort | undefined;
let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

const uniqueCmd = new Uint8Array([
    0xa0, 0x0d, 0x01, 0x8a, 0x00, 0x0a, 0x01, 0x0a, 0x02, 0x0a, 0x03, 0x0a, 0x01,
    0x05, 0x94,]);
const rfidPattern = /e28069[\da-f]{18}/ig;

function extractRFIDTags(hexString: string): string[] {
    return [...hexString.matchAll(rfidPattern)].map(match => match[0]);
}

export async function readBulkRFIDTags(setTags: React.Dispatch<React.SetStateAction<string[]>>) {
    if (!("serial" in navigator)) {
        console.error("Web Serial API not supported in this browser.");
        alert("Web Serial API not supported in this browser.");
        return [];
    }

    let uniqueTags = new Set<string>();

    try {
        const ports = await navigator.serial.getPorts();
        port = ports.length > 0 ? ports[0] : await navigator.serial.requestPort();
        console.log('Port selected');

        await port.open({ baudRate: 115200 });
        console.log('Port opened');

        const writer = port.writable.getWriter();
        await writer.write(uniqueCmd);
        writer.releaseLock();
        console.log('Command sent');

        const reader = port.readable.getReader();
        let receivedData = new Uint8Array();
        
        while (keepReading) {
            const { value, done } = await reader.read();
            if (done) {
                console.log('Stream closed by the device');
                break;
            }

            const newData = new Uint8Array(receivedData.length + value.length);
            newData.set(receivedData);
            newData.set(value, receivedData.length);
            receivedData = newData;

            // const readBuffer = Buffer.from(receivedData).toString('hex');
            // const newTags = extractRFIDTags(readBuffer);
            // newTags.forEach(tag => {
            //     if (!uniqueTags.has(tag)) {
            //         uniqueTags.add(tag);
            //         setTags(Array.from(uniqueTags));
            //     }
            // });

            let buffer1: string = '';
            let buffer2: string = '';
            let buf1 = false;
            let buf2 = false;

            if (receivedData.length === 17) {
                buffer2 = Buffer.from(receivedData).toString('hex');
                buf2 = true;
            } else if (receivedData.length === 8) {
                buffer1 = Buffer.from(receivedData).toString('hex');
                buf1 = true;
            } else if (receivedData.length > 24) {
                const readBuffer = Buffer.from(receivedData).toString('hex');
                const newTags = extractRFIDTags(readBuffer);
                newTags.forEach(tag => {
                    if (!uniqueTags.has(tag)) {
                        uniqueTags.add(tag);
                        setTags(Array.from(uniqueTags));
                    }
                });
            }

            if (buf1 && buf2) {
                const combinedBuffer = buffer1 + buffer2
                const newTags = extractRFIDTags(combinedBuffer);
                newTags.forEach(tag => {
                    if (!uniqueTags.has(tag)) {
                        uniqueTags.add(tag);
                        setTags(Array.from(uniqueTags));
                    }
                });
            }

            // Assuming the last byte is \n and always completes a tag reading session
            receivedData = receivedData.slice(receivedData.lastIndexOf(0x0A) + 1);
        }

        reader.releaseLock();
        await port.close();
        port = undefined;
        console.log('Port closed');
    } catch (error) {
        console.error('Failed to connect to the RFID reader:', error);
    } finally {
        if (reader) {
            await reader.cancel();  // Cancel the reader to release the lock
            reader.releaseLock();   // Release the lock explicitly
        }
        if (port) {
            await port.close(); // Close the port
            console.log('Port closed');
            port = undefined; // Clear the port reference after closing
        }
    }
    
    return Array.from(uniqueTags);
}

export async function stopReading() {
    keepReading = false;
    if (reader) {
        await reader.cancel();  // Ensure reader is canceled to release the lock
        reader.releaseLock();
    }
    if (port) {
        try {
            await port.close(); // Attempt to close the port
            console.log('Port manually closed');
            port = undefined;
        } catch (error) {
            console.error('Error closing the port:', error);
        }
    }
}
