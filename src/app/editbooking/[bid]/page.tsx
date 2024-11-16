import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";
import EditBookingPane from "@/components/EditBookingPane";
import getBookingsById from "@/libs/getBookingById";

export default async function ModifyBookingPage({params} : {params: {bid: string}}) {

  const session = await getServerSession(authOptions);
  if(!session) return

  const bookings = await getBookingsById(params.bid, session.user.token)

  return(
    <main className="w-full flex flex-col items-center bg-white space-y-4 pt-2 pb-5">

      <div className="text-2xl">Modifying Booking ID: {params.bid}</div>

      <EditBookingPane bid={bookings.data._id} hotel={bookings.data.hotel.name} book={bookings.data.bookingDate} checkout={bookings.data.checkoutDate} token={session.user.token} />

    </main>
  )
}