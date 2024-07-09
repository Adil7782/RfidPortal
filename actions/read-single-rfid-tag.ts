const uniqueCmd = new Uint8Array([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

function extractValue(input: string): string | null {
    const prefix = 'a55a0019833000';
    const regex = new RegExp(`${prefix}(.+?)00[a-f0-9]{8}$`, 'i');
    const match = input.match(regex);
    return match ? match[1] : null;
}

export async function readSingleRFIDTag(): Promise<string> {
    if (!("serial" in navigator)) {
        console.error("Web Serial API not supported in this browser.");
        alert("Web Serial API not supported in this browser.");
        return Promise.reject("Web Serial API not supported");
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
            const { value, done } = await reader.read();
            if (done) {
                console.error('Stream closed by the device');
                return '';
            }

            const tagData = Array.from(new Uint8Array(value))
                .map((byte: number) => byte.toString(16).padStart(2, '0'))
                .join('');

            const extractedValue = extractValue(tagData);
            console.log("RFID Tag:", extractedValue);
            return extractedValue ?? '';
        } catch (error) {
            console.error('Read error:', error);
            return Promise.reject(error);
        } finally {
            reader.releaseLock();
            await port.close();
            console.log('Port closed');
        }
    } catch (error) {
        console.error('Failed to connect to the RFID reader:', error);
        return Promise.reject(error);
    }
}