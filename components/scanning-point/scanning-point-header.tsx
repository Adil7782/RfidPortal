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
}

const ScanningPointHeader = ({
    user,
    pointName
}: ScanningPointHeaderProps) => {
    return (
        <header className='flex sticky top-0 justify-between items-center px-4 h-[56px] bg-white border-b shadow-sm'>
            <Image
                src='/images/logo.svg'
                alt='logo'
                width={100}
                height={100}
            />
            <div className='flex items-center'>
                <div className='-mr-24 z-10 opacity-80 w-20'>
                    <LiveClock />
                </div>
                <div className='primary-bg py-2 w-[680px] text-white tracking-wide rounded-lg flex justify-center text-xl font-semibold'>
                    {pointName || 'Admin'}
                </div>
            </div>
            <UserProfileButton name={user.name} email={user.email} />
        </header>
    )
}

export default ScanningPointHeader