import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";

import ScanningPointHeader from "@/components/scanning-point/scanning-point-header";

const ScanningPointLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const cookieStore = cookies();
    const token = cookieStore.get('ELIOT_AUTH');

    if (!token) {
        return redirect('/sign-in');
    } else {
        const { value } = token;
        const secret = process.env.JWT_SECRET || "";

        const verified = verify(value, secret) as JwtPayloadType;

        return (
            <section className="w-full min-h-screen">
                <div className="mx-auto max-w-7xl h-full flex flex-col">
                    <ScanningPointHeader 
                        user={verified.user}
                        pointName={verified.scanningPoint.name}
                        pointNo={verified.scanningPoint.pointNo}
                    />
                    <main className="px-4 py-2">
                        {children}
                    </main>
                </div>
            </section>
        )
    }
}

export default ScanningPointLayout;