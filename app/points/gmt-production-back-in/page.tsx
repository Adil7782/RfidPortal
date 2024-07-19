import ScanningGmtQRDialogModel from "./_components/scanning-gmt-qr-dialog-model";

const ScanningPoint3Page = () => {
    const timestamp = new Date().getTime().toString(36);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz-";
    
    const randomString = Array.from({ length: 12 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

    const id = timestamp + "-" + randomString;
    console.log("ID: " + id);

    return (
        <section className='p-4 h-full flex flex-col justify-center items-center'>
            <ScanningGmtQRDialogModel />
        </section>
    )
}

export default ScanningPoint3Page