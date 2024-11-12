import ReservationCart from "@/components/BookingList"
import { getServerSession } from "next-auth"
import getAllBookings from "@/libs/getAllBookings"
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function CartPage(){

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const bookings = await getAllBookings(session.user.token)

    return(
        <main>
            {
                bookings.data.map((bookingsItem:Object)=>(
                    <ReservationCart HotelName={bookingsItem.hotel.name}
                                    check_in={bookingsItem.bookingDate}
                                    check_out={bookingsItem.checkoutDate}
                                    id={bookingsItem._id}
                                    token={bookingsItem.user.token}
                                    BookerName={bookingsItem.user.name}/>

                )

                )
            }
            
        </main>
    )
}