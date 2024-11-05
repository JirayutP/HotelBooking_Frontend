'use client'

import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeBooking } from "@/redux/features/bookSlice"
import dayjs from "dayjs"

export default function ReservationCart() {
    const bookItem = useAppSelector((state)=> state.reduxPersistedReducer.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    
    return(
        <>
            {
                bookItem.length > 0 ? (
                    bookItem.map((bookingItem)=>(
                        <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                        key={bookingItem.user}>
                            <div className="text-xl">Booking Date: {bookingItem.bookingDate}</div>
                            <div className="text-xl">Checkout Date: {bookingItem.checkoutDate}</div>
                            <div className="text-xl">User: {bookingItem.user}</div>
                            <div className="text-xl">Hotel: {bookingItem.hotel}</div>
                            <div className="text-xl">Created At: {bookingItem.createdAt}</div>
                            <div className="text-xl">Duration: {dayjs(bookingItem.checkoutDate).diff(dayjs(bookingItem.bookingDate), 'day')}</div>
                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                                onClick={()=> dispatch(removeBooking(bookingItem))}>
                                    Remove from Booking List
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                        No Hotel Booking
                    </div>
                )
            }
        </>
    )
}