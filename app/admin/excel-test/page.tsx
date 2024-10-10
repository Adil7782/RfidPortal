import React from 'react'
import { getData } from './action';
import Analytics from './_components/analytics';

const page = async () => {

    const data = await getData();
    
    // console.log(data)


  return (
    <div>
        <Analytics data={data}></Analytics>
    </div>
  )
}

export default page