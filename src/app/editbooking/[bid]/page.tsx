import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";
import EditBookingPane from "@/components/EditBookingPane";

export default async function ModifyBookingPage({params} : {params: {bid: string}}) {

  const session = await getServerSession(authOptions);
  if(!session) return

  return(
    <main className="w-full flex flex-col items-center bg-white space-y-4 pt-2 pb-5">

      <div className="text-3xl">Modifying Booking ID: {params.bid}</div>

      <EditBookingPane bid={params.bid} token={session.user.token} />

    </main>
  )
}