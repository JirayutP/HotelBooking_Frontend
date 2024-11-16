'use client'
import deleteBooking from "@/libs/deleteBooking"
import { useRouter } from "next/navigation"

export default function ReservationCart({ HotelName, check_in, check_out, id, token, BookerName } : { HotelName: string, check_in: string, check_out: string, id: string, token: string, BookerName?: string }) {
  const router = useRouter()
  const formattedCheckIn = check_in.slice(0, 10)
  const formattedCheckOut = check_out.slice(0, 10)

  return (
    <div className="max-w-lg border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white flex flex-col sm:flex-row m-4 hover:shadow-xl transition-shadow duration-200">
      <div className="p-4 flex-grow overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-800 truncate" title={HotelName}>{HotelName}</h2>
        {BookerName && (
          <p className="text-sm text-gray-600 mt-1 truncate" title={`Booked by: ${BookerName}`}>Booked by: <span className="font-medium">{BookerName}</span></p>
        )}
        <p className="text-sm text-gray-600 mt-2 truncate" title={`Check-in date: ${formattedCheckIn}`}>Check-in date: <span className="font-medium">{formattedCheckIn}</span></p>
        <p className="text-sm text-gray-600 truncate" title={`Check-out date: ${formattedCheckOut}`}>Check-out date: <span className="font-medium">{formattedCheckOut}</span></p>
      </div>
      <div className="p-4 flex sm:flex-col justify-center items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-200">
        <button
          className="block w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow transition-all duration-200"
          onClick={() => { router.push(`editbooking/${id}`) }}
        >
          Edit
        </button>
        <button
          className="block w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow transition-all duration-200"
          onClick={() => {
            deleteBooking(id, token)
            setTimeout(() => { router.refresh() }, 1000)
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
