const uniqueCmd = new Uint8Array([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

function extractValue(input: string): string | null {
    const prefix = 'a55a0019833000';
    const regex = new RegExp(`${prefix}(.+?)00[a-f0-9]{8}$`, 'i');
    const match = input.match(regex);
    return match ? match[1] : null;
}

export async function connectRFIDReader() {
    if (!("serial" in navigator)) {
        console.error("Web Serial API not supported in this browser.");
        alert("Web Serial API not supported in this browser.");
        return;
    }

    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        console.log('Port opened');

        const writer = port.writable.getWriter();
        await writer.write(uniqueCmd);
        writer.releaseLock();
        console.log('Command sent');

        const reader = port.readable.getReader();
        try {
            let receivedData = new Uint8Array();  // Initialize a buffer to collect received data

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    console.log('Stream closed by the device');
                    break;
                }

                // Correctly concatenate Uint8Array
                let tempData = new Uint8Array(receivedData.length + value.length);
                tempData.set(receivedData);
                tempData.set(value, receivedData.length);
                receivedData = tempData;

                // Assuming the end of a message is denoted by a newline or specific delimiter
                const endIndex = receivedData.indexOf(0x0A); // Example: newline as delimiter
                if (endIndex !== -1) {
                    const tagData = receivedData.slice(0, endIndex);
                    const tagId = Array.from(tagData)
                        .map((byte: number) => byte.toString(16).padStart(2, '0'))
                        .join('');

                    const extractedValue = extractValue(tagId);
                    console.log("RFID Tag:", tagId);
                    console.log("RFID:", extractedValue);
                    alert(`RFID Tag: ${tagId}`);

                    // Reset the buffer removing processed data
                    receivedData = receivedData.slice(endIndex + 1);
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
}
