import Image from 'next/image';
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

const AdminLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');

    if (!token) {
        return redirect('/sign-in');
    }

    const { value } = token;
    const secret = process.env.JWT_SECRET || "";

    const verified = verify(value, secret) as JwtPayloadType;

    if (verified.user.role === 'tracker' || verified.user.role === 'admin') {
        return (
            <div>
                {children}
            </div>
        )
    } else {
        return redirect('/');
    }
}

export default AdminLayout