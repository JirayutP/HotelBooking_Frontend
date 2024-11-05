'use client'
import DateReserve from "@/components/DateReserve"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem } from "../../../interface"
import { addBooking} from "@/redux/features/bookSlice"
import { useSession } from "next-auth/react"

export default function Booking() {
    const urlParams = useSearchParams()
    const hid = urlParams.get('id')
    const name = urlParams.get('name')
    const {data:session} = useSession()

    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)
    const [checkoutDate, setCheckoutDate] = useState<Dayjs|null>(null)

    const dispatch = useDispatch<AppDispatch>()
    const makeBooking = () => {
        if(hid && name && bookingDate && checkoutDate){
            const item:BookingItem = {
                bookingDate: dayjs(bookingDate).format('YYYY/MM/DD'),
                checkoutDate: dayjs(checkoutDate).format('YYYY/MM/DD'),
                user: session?.user?.name || '',
                hotel: name,
            }
            dispatch(addBooking(item))
        }
    }

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Booking</div>
            <div className="text-xl font-medium">Hotel {name}</div>
            
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">BookingDate</div>
                <DateReserve setDateChange={(value: Dayjs) => setBookingDate(value)}/>
            </div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">CheckoutDate</div>
                <DateReserve setDateChange={(value: Dayjs) => setCheckoutDate(value)}/>
            </div>

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={makeBooking}>
                Book this hotel
            </button>
        </main>
    )
}