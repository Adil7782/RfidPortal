import Image from 'next/image'
import React from 'react'

const AdminDashboardPage = () => {
    return (
        <div className='w-full mt-40 flex flex-col justify-center items-center'>
            <Image
                src="/images/welcome.gif"
                alt='gif'
                width={1000}
                height={400}
                className='w-1/4'
            />
            <p className='text-center text-xl'>to the Admin Dashboard of RFID Tracker!</p>
        </div>
    )
}

export default AdminDashboardPage