'use client'
import DateReserve from "@/components/DateReserve"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useSession } from "next-auth/react"
import bookHotel from "@/libs/bookHotel"
import { useRouter } from "next/navigation"


export default function Booking() {
    const router = useRouter();
    const urlParams = useSearchParams()
    const hid = urlParams.get('id')
    const name = urlParams.get('name')
    const { data: session } = useSession()

    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null)
    const [checkoutDate, setCheckoutDate] = useState<Dayjs | null>(null)

    const handleBooking = () => {
        if (!hid || !name || !bookingDate || !checkoutDate) {
            alert("Please provide all booking details.");
            return;
        }
    
        const today = dayjs().startOf('day');
        if (bookingDate.isBefore(today)) {
            alert("The booking date cannot be in the past.");
            return;
        }
    
        if (!bookingDate.isBefore(checkoutDate)) {
            alert("The booking date must be before the checkout date, and they cannot be the same day.");
            return;
        }
    
        const maxAllowedNights = 3;
        const daysDiff = checkoutDate.diff(bookingDate, 'day');
    
        if (daysDiff > maxAllowedNights) {
            alert(`Bookings cannot exceed ${maxAllowedNights} nights. Please select a shorter stay.`);
            return;
        }
        
        bookHotel(hid, session?.user.token || "", dayjs(bookingDate).format('YYYY/MM/DD'), dayjs(checkoutDate).format('YYYY/MM/DD'), dayjs().format('YYYY/MM/DD'))
        .then(()=>{
            router.push('/mybooking')
            router.refresh();
        });
    };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Booking</div>
            <div className="text-xl font-medium">Hotel {name}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Booking Date</div>
                <DateReserve setDateChange={(value: Dayjs) => setBookingDate(value)} />
            </div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Checkout Date</div>
                <DateReserve setDateChange={(value: Dayjs) => setCheckoutDate(value)} />
            </div>

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={handleBooking}>
                Book this hotel
            </button>
        </main>
    )
}
