'use client'

import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeReservation } from "@/redux/features/carSlice"

export default function ReservationCart() {
    const carItem = useAppSelector((state)=> state.reduxPersistedReducer.carSlice.carItems)
    const dispatch = useDispatch<AppDispatch>()
    
    return(
        <>
            {
                carItem.map((reservationItem: ReservationItem)=>(
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                    key={reservationItem.carId}>
                        <div className="text-xl">{reservationItem.carModel}</div>
                        <div className="text-sm">Pick-up {reservationItem.pickupDate} from {reservationItem.pickupLocation}</div>
                        <div className="text-sm">Return {reservationItem.returnDate} to {reservationItem.returnLocation}</div>
                        <div className="text-md">Duration: {reservationItem.numOfDays}</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                        onClick={()=> dispatch(removeReservation(reservationItem))}>
                            Remove from Cart
                        </button>
                    </div>
                ))
            }
        </>
    )
}