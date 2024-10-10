import React from 'react'
import { getData } from './action';
import Analytics from './_components/analytics';
import { CardTitle } from '@/components/ui/card';

const page = async () => {

   
    
    // console.log(data)


  return (
    <div>
       <div className="sticky top-16 py-2 pr-3 pl-6 w-full z-50 border-b rounded-t-lg  items-center bg-white/80 backdrop-blur-lg">

<CardTitle className="text-center pb-4 rounded-lg mt-2 sticky shadow-md">
    {" "}
    {" "}
    Line Efficiency
  </CardTitle>
  </div>
        <Analytics ></Analytics>
    </div>
  )
}

export default page