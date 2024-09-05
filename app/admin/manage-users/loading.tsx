import { Loader2 } from "lucide-react";

const OperationLoading = () => {
    return (
        <div className='w-full mt-40 flex justify-center'>
            <Loader2 className='animate-spin w-9 h-9 text-slate-500'/>
        </div>
    )
}

export default OperationLoading;