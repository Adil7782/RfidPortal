import { fetchProductsByRfids } from "./fetch-products-by-rfids";

let keepReading = true;
let port: SerialPort | undefined;

const uniqueCmd = new Uint8Array([
    0xa0, 0x0d, 0x01, 0x8a, 0x00, 0x0a, 0x01, 0x0a, 0x02, 0x0a, 0x03, 0x0a, 0x01, 0x05, 0x94,]);
    
function extractRFIDTags(hexString: string): string[] {
    const rfidPattern = /e28069[\da-f]{18}/ig;
    return [...hexString.matchAll(rfidPattern)].map(match => match[0]);
}

export async function readBulkRFIDTags(setTags: React.Dispatch<React.SetStateAction<string[]>>, setProductDetails: React.Dispatch<React.SetStateAction<ProductDataForRFIDType[]>>) {
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

        // Set a timeout to automatically stop reading and close the port after 30 seconds
        const timeoutId = setTimeout(async () => {
            keepReading = false;
            if (reader) {
                await reader.cancel();
                reader.releaseLock();
                console.log('Reading stopped automatically');
            }
            if (port) {
                await port.close();
                console.log('Port closed automatically after 30 seconds');
            }
        }, 30000);  // 30 seconds
        
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

            // const readBuffer = Array.from(receivedData)
            //                         .map(byte => byte.toString(16).padStart(2, '0'))
            //                         .join('');

            const readBuffer = Buffer.from(receivedData).toString('hex');
            const newTags = extractRFIDTags(readBuffer);
            let freshTags: string[] = [];
            newTags.forEach(tag => {
                if (!uniqueTags.has(tag)) {
                    uniqueTags.add(tag);
                    setTags(Array.from(uniqueTags));
                    freshTags.push(tag);
                }
            });

            if (freshTags.length > 0) {
                const productData = await fetchProductsByRfids(freshTags);
                setProductDetails(previousData => [...previousData, ...productData]);
            }

            // Assuming the last byte is \n and always completes a tag reading session
            receivedData = receivedData.slice(receivedData.lastIndexOf(0x0A) + 1);
        }

        reader.releaseLock();
        
        if (port && !port.readable.locked) {
            await port.close();
            clearTimeout(timeoutId);
            console.log('Port closed');
        }
    } catch (error) {
        console.error('Failed to connect to the RFID reader:', error);
    }
    
    return Array.from(uniqueTags);
}
