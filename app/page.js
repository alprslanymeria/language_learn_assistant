import AppInitializer from "@/components/AppInitializer";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { GetUserById } from "@/actions/user";

export default async function Home() {

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  let userId = "";

  if(session)
  {
    userId = session.userId;
  }

  const response = await GetUserById(userId);
  const user = response.data;

  return (
    <>
      <AppInitializer userr={user}></AppInitializer>
    </>
  );
}
