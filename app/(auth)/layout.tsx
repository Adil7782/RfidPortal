import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');

    if (token) {
        return redirect('/');
    } else {
        return (
            <main>
                {children}
            </main>
        )
    }
}

export default AuthLayout;