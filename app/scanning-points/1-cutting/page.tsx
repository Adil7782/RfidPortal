import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";

import ScanningBundleQRDialogModel from "./_components/scanning-bundle-qr-dialog-model";

const SP1CuttingPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('ELIOT_AUTH');

  if (!token) {
    return redirect('/sign-in');
  }
  const { value } = token;
  const secret = process.env.JWT_SECRET || "";
  const verified = verify(value, secret) as JwtPayloadType;
  const email: string = verified.user.email;

  return (
    <section className='p-4 h-full flex flex-col justify-center items-center'>
      <ScanningBundleQRDialogModel userEmail={email} />
    </section>
  )
}

export default SP1CuttingPage