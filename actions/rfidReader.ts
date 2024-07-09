const uniqueCmd = new Uint8Array([0xA5, 0x5A, 0x00, 0x0A, 0x82, 0x00, 0x64, 0xEC, 0x0D, 0x0A]);

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
            const { value, done } = await reader.read();
            if (done) {
                console.error('Stream closed too early.');
            } else {
                const readBuffer = new TextDecoder().decode(value);
                console.log("RFID Tag:", readBuffer);
                alert(`RFID Tag: ${readBuffer}`);
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
