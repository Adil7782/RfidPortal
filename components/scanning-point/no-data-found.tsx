import Image from "next/image"

const NoDataFound = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image
                src='/images/no-data-found.gif'
                alt="No data found"
                width={600}
                height={200} 
                className="w-1/2"       
            />
            <p className="text-slate-500">Sorry! No Data Found 🥺</p>
        </div>
    )
}

export default NoDataFound