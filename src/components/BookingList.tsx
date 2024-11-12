'use client'
import Image from "next/image"
import deleteBooking from "@/libs/deleteBooking"
import { revalidateTag } from "next/cache"
import { useRouter } from "next/navigation";

export default function ReservationCart({HotelName, check_in, check_out, id, token, BookerName} : {HotelName:string, 
check_in:string, check_out:string, id:string, token:string, BookerName?:string }) {
  
  const router = useRouter();

  let ci = check_in.slice(0,10);
  let co = check_out.slice(0,10);
  
  return(
    <div className="w-[30%] h-[20vh] border-2 border-black rounded-md flex flex-row" >
      {/* <Image src={imgSrc}
          alt={HotelName}
          width={500}
          height={500}
          className='w-[30%] h-full object-cover rounded-l-sm'/> */}
      <div className='w-[80%] text-left mx-5 whitespace-pre-line flex flex-col justify-center'>
        <div className='text-xl'>{HotelName}</div>
        {
          BookerName? <div className=''>Booked by: {BookerName}</div>
            :null
        }        
        <div className=''>Check in date: {ci}</div>
        <div className=''>Check out date: {co}</div>
        </div>
        <div className='w-1/5 mx-5 flex flex-col justify-center space-y-1'>
        <button className="font-sans block rounded-md bg-sky-500 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
            onClick={()=>{router.push(`editbooking/${id}`);}}>
            Edit
        </button>
        <button className="font-sans block rounded-md bg-red-500 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
            onClick={()=>{deleteBooking(id,token);setTimeout(()=>{router.refresh();},1000);}}>
            Cancel
        </button>
      </div>
    </div>
  )
}