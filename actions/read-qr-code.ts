export async function readQRCode(): Promise<string | null> {
    if (!("serial" in navigator)) {
        console.error("Web Serial API not supported in this browser.");
        alert("Web Serial API not supported in this browser.");
        return null;
    }

    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        console.log('QR Scanner Port opened');

        const reader = port.readable.getReader();
        let receivedData = new Uint8Array();

        try {
            const { value, done } = await reader.read();
            if (done) {
                console.log('Stream closed by the device');
            } else {
                let tempData = new Uint8Array(receivedData.length + value.length);
                tempData.set(receivedData);
                tempData.set(value, receivedData.length);
                receivedData = tempData;

                const endIndex = receivedData.indexOf(0x0A); // Assuming newline denotes end of QR data
                if (endIndex !== -1) {
                    const qrData = new TextDecoder().decode(receivedData.slice(0, endIndex));
                    console.log("QR Code read:", qrData);
                    await reader.cancel();  // Stops reading
                    await port.close();
                    console.log('QR Scanner Port closed');
                    return qrData;  // Return the QR Code data
                }
            }
        } catch (error) {
            console.error('Read error:', error);
        } finally {
            reader.releaseLock();
        }

        await port.close();
        console.log('QR Scanner Port closed');
    } catch (error) {
        console.error('Failed to connect to the QR scanner:', error);
    }
    return null;
}