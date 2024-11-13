import ReservationCart from "@/components/BookingList"
import { getServerSession } from "next-auth"
import getAllBookings from "@/libs/getAllBookings"
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function CartPage() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
  
    const bookings = await getAllBookings(session.user.token)
  
    return (
        <main className="max-w-7xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Lists</h1>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookings.data.map((bookingItem: any) => (
            <ReservationCart
              key={bookingItem._id}
              HotelName={bookingItem.hotel.name}
              check_in={bookingItem.bookingDate}
              check_out={bookingItem.checkoutDate}
              id={bookingItem._id}
              token={session.user.token}
              BookerName={bookingItem.user}
            />
          ))}
        </div>
      </main>
      
    )
  }