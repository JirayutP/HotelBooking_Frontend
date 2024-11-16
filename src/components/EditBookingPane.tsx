'use client'
import editBooking from "@/libs/editBooking";
import { useRouter } from "next/navigation"
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs"
import DateReserve from "@/components/DateReserve"

export default function EditBookingPane({bid,hotel,book,checkout,token} : {bid:string,hotel:string,book:string,checkout:string,token:string}) {
  
  const router = useRouter();

  const [bookingDate, setBookingDate] = useState<Dayjs|null>(dayjs(book, 'YYYY/MM/DD'))
  const [checkoutDate, setCheckoutDate] = useState<Dayjs|null>(dayjs(checkout, 'YYYY/MM/DD'))

  const handleEditing = () => {
    if (!bookingDate || !checkoutDate) {
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
    
    editBooking(bid,token, dayjs(bookingDate).format('YYYY/MM/DD'), dayjs(checkoutDate).format('YYYY/MM/DD'))
    .then(()=>{
      router.push('/mybooking')
      router.refresh();
    });
  };

  
  return(
    <div className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium my-5">Edit Booking</div>
            <div className="text-md font-medium text-gray-600">Hotel: {hotel}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">BookingDate</div>
                <DateReserve setDateChange={(value: Dayjs) => setBookingDate(value)} defaultDate={book}/>
            </div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">CheckoutDate</div>
                <DateReserve setDateChange={(value: Dayjs) => setCheckoutDate(value)} defaultDate={checkout}/>
            </div>

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={handleEditing}>
                Save
            </button>
    </div>
  )
}