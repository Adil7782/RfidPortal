import Image from 'next/image'

const ScanningFilesAnimation = ({ part }: { part: string }) => {
    return (
        <div className="h-full flex flex-col justify-center items-center bg-slate-50 rounded-lg border border-[#0980D4]/50 border-dashed">
            <Image
                src='/images/scanning-files.gif'
                alt="Scanning"
                width={600}
                height={200}
                className="mt-2 w-2/3 rounded-md"
            />
            <p className="mt-2 font-medium text-slate-600">
                Please Scan {part} Part
            </p>
        </div>
    )
}

export default ScanningFilesAnimation