import Image from 'next/image';

import UserProfileButton from '@/components/auth/user-profile-button';
import LiveClock from '@/components/live-clock';

interface ScanningPointHeaderProps {
    user: {
        email: string | undefined;
        role: string | undefined;
        name: string | undefined;
    };
    pointName: string | null;
    pointNo: number | null;
}

const ScanningPointHeader = ({
    user,
    pointName,
    pointNo
}: ScanningPointHeaderProps) => {
    return (
        <header className='flex sticky top-0 justify-between items-center px-4 h-[56px] bg-white border-b shadow-sm z-50'>
            <Image
                src='/images/logo.svg'
                alt='logo'
                width={100}
                height={100}
                className='ml-2'
            />
            <div className='flex items-center -ml-12'>
                <div className='-mr-24 z-10 opacity-80 w-20'>
                    <LiveClock />
                </div>
                <div className='primary-bg py-2 w-[680px] text-white tracking-wide rounded-lg flex justify-center text-xl font-semibold'>
                    {pointName || 'Admin'}
                </div>
            </div>
            <UserProfileButton
                role={user.role}
                name={user.name}
                email={user.email}
                pointNo={pointNo}
            />
        </header>
    )
}

export default ScanningPointHeader