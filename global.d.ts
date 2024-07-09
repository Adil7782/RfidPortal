declare module 'serialport';
declare module '@serialport/parser-delimiter';
declare module 'hex-to-array-buffer';

// Extend the Navigator interface to include the serial API
interface Navigator {
    serial: {
        getPorts: () => Promise<SerialPort[]>;
        requestPort: () => Promise<SerialPort>;
    }
}

interface SerialPort {
    readable: ReadableStream;
    writable: WritableStream;
    open: (options: { baudRate: number }) => Promise<void>;
    close: () => Promise<void>;
}

declare global {
    interface Window { navigator: Navigator }
}
