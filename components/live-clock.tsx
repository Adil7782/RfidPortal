"use client"

import Clock from 'react-live-clock';

const LiveClock = () => {
    const timezone: string = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka';

    return (
        <Clock
            format={'HH:mm:ss'}
            ticking={true}
            style={{ color: 'white', fontFamily: 'Inter', fontSize: '18px', fontWeight: '500' }}
            timezone={timezone}
            noSsr={true}
        />
    )
}

export default LiveClock