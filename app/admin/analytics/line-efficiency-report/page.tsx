import LineEfficiencyReport from "./_components/report-table";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUnit } from "./_components/actions";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("ELIOT_AUTH");

  if (!token) {
    return redirect("/sign-in");
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";

  const verified = verify(value, secret) as JwtPayloadType;

  

  return (
    <div>
      <LineEfficiencyReport/>
    </div>
  );
};

export default Page;
