const uniqueCmd = new Uint8Array([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

function extractValue(input: string): string | null {
    const prefix = 'a55a0019833000';
    const regex = new RegExp(`${prefix}(.+?)00[a-f0-9]{8}$`, 'i');
    const match = input.match(regex);
    return match ? match[1] : null;
}

export async function readSingleRFIDTag(): Promise<string | null> {
    if (!("serial" in navigator)) {
        console.error("Web Serial API not supported in this browser.");
        alert("Web Serial API not supported in this browser.");
        return null;
    }

    let port;

    try {
        const ports = await navigator.serial.getPorts();
        if (ports.length > 0) {
            port = ports[0];  // Use the first saved port
            console.log('Using saved port');
        } else {
            port = await navigator.serial.requestPort();  // Request user to select a port
            console.log('No saved ports available, requesting new port');
        }

        await port.open({ baudRate: 115200 });
        console.log('Port opened');

        const writer = port.writable.getWriter();
        await writer.write(uniqueCmd);
        writer.releaseLock();
        console.log('Command sent');

        const reader = port.readable.getReader();
        let receivedData = new Uint8Array();

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    console.log('Stream closed by the device');
                    break;
                }

                let tempData = new Uint8Array(receivedData.length + value.length);
                tempData.set(receivedData);
                tempData.set(value, receivedData.length);
                receivedData = tempData;

                const endIndex = receivedData.indexOf(0x0A);
                if (endIndex !== -1) {
                    const tagData = receivedData.slice(0, endIndex);
                    const tagId = Array.from(tagData)
                        .map((byte: number) => byte.toString(16).padStart(2, '0'))
                        .join('');
        
                    const tagValue = extractValue(tagId);
                    if (tagValue) {
                        console.log("RFID Tag read:", tagValue);
                        await reader.cancel();  // Stops reading
                        await port.close();
                        console.log('Port closed');
                        return tagValue;  // Return the extracted tag value
                    }
                }
            }
        } catch (error) {
            console.error('Read error:', error);
        } finally {
            reader.releaseLock();
        }

        await port.close();
        console.log('Port closed');
    } catch (error) {
        console.error('Failed to connect to the RFID reader:', error);
    }
    return null;
}
