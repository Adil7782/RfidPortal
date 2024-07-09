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

        const reader = port.readable.getReader();
        console.log("Reader obtained, starting to read...");

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    console.log("Stream closed by the device or reader");
                    break;
                }
                console.log(`Received data: ${new TextDecoder().decode(value)}`);
            }
        } catch (error) {
            console.error(`Error while reading from port: ${error}`);
        } finally {
            reader.releaseLock();
        }

        await port.close();
        console.log("Port closed");
    } catch (error) {
        console.error("Failed to open port: ", error);
    }
}
