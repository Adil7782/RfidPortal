import ReadRfid from '@/components/read-rfid'
import React from 'react'

const TestPage = () => {
  return (
    <div className='mx-auto max-w-7xl'>
        <h1 className='text-2xl font-medium mt-12 mb-4'>RFID Reader</h1>
        <div className='p-4 bg-slate-100 rounded-lg border'>
            <ReadRfid />
        </div>
    </div>
  )
}

export default TestPage