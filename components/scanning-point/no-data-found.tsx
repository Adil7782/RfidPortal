import Image from "next/image"

const NoDataFound = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image
                src='/images/not-found.gif'
                alt="No data found"
                width={600}
                height={200} 
                className="-mt-6 w-1/2"       
            />
            <p className="-mt-4 mb-4 text-slate-500">Sorry! No Data Found 🥺</p>
        </div>
    )
}

export default NoDataFound