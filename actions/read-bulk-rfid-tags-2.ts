let keepReading = true;
const uniqueCmd = new Uint8Array([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);
const rfidPattern = /e28069950000[\da-f]{12}/ig;

let port: SerialPort | undefined;

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
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

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
        keepReading = true;
        
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

            const readBuffer = Buffer.from(receivedData).toString('hex');
            const newTags = extractRFIDTags(readBuffer);

            newTags.forEach(tag => {
                if (!uniqueTags.has(tag)) {
                    uniqueTags.add(tag);
                    setTags(Array.from(uniqueTags));
                }
            });

            // receivedData = receivedData.slice(receivedData.lastIndexOf(0x0A) + 1);
            receivedData = new Uint8Array(); 
        }

    } catch (error) {
        console.error('Failed to connect to the RFID reader:', error);
    } finally {
        if (reader) {
            await reader.releaseLock();
        }
        if (port && !keepReading) {
            await port.close();
            console.log('Port manually closed');
        }
    }
    
    return Array.from(uniqueTags);
}

export async function stopReading() {
    keepReading = false;
    if (port) {
        port.close().then(() => {
            console.log("Port closed after stopping the reading.");
        }).catch(error => {
            console.error("Failed to close the port:", error);
        });
    }
}