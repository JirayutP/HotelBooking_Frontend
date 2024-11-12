'use client'
import editBooking from "@/libs/editBooking";
import { useRouter } from "next/navigation"
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs"
import DateReserve from "@/components/DateReserve"
//import { DateRange } from "react-day-picker"
//import { addDays } from "date-fns"
//import DatePicker from "./DatePicker";
//import MyButton from "./MyButton";

export default function EditBookingPane({bid,token} : {bid:string,token:string}) {
  
  const router = useRouter();

//   const [date, setDate] = useState<DateRange | undefined>({
//     from: new Date(2023, 10, 23),
//     to: addDays(new Date(2023, 10, 23), 2),
//   })
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)
    const [checkoutDate, setCheckoutDate] = useState<Dayjs|null>(null)

//   function toModifyBooking() {
//     editBooking(bid,token, addDays(date.from,1)?.toJSON().slice(0,10), addDays(date.to,1)?.toJSON().slice(0,10))
//     .then(() => {
//       router.push('/bookings');
//       router.refresh();
//     })
//     .catch((error) => {
//       alert("You can book a hotel only up to 3 nights")
//     })
//   }
  
  return(
    <div className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">Edit Booking</div>
            
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">BookingDate</div>
                <DateReserve setDateChange={(value: Dayjs) => setBookingDate(value)}/>
            </div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">CheckoutDate</div>
                <DateReserve setDateChange={(value: Dayjs) => setCheckoutDate(value)}/>
            </div>

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={()=>{
                    editBooking(bid,token, dayjs(bookingDate).format('YYYY/MM/DD'), dayjs(checkoutDate).format('YYYY/MM/DD'))
                    .then(()=>{
                        router.push('/mybooking')
                        router.refresh();
                    })
                }}>
                Submit
            </button>
    </div>
  )
}