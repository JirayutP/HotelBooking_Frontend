import Image from "next/image"
import getHotel from "@/libs/getHotel"
import Link from "next/link"
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import AdminHotelButton from "@/components/AdminHotelButton"
import { revalidateTag } from "next/cache"

export default async function HotelDetailPage({params}:{params:{hid:string}}){
    revalidateTag('hotel')
    const hotelDetail = await getHotel(params.hid)
    const hotelData = hotelDetail.data

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{hotelDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={hotelDetail.data.picture}
                alt='Hotel Image'
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">Address: {hotelDetail.data.address}
                    <div className="text-md mx-5">District: {hotelDetail.data.district}</div>
                    <div className="text-md mx-5">Province: {hotelDetail.data.province}</div>
                    <div className="text-md mx-5">Postalcode: {hotelDetail.data.postalcode}</div>
                    <div className="text-md mx-5">Tel: {hotelDetail.data.tel}</div>
                    
                    <Link href={`/booking?id=${params.hid}&name=${hotelDetail.data.name}`}>
                        <button className="my-2 block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                            Make Booking
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    )
    
    const profile = await getUserProfile(session.user.token)
   
    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{hotelDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={hotelDetail.data.picture}
                alt='Hotel Image'
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">Address: {hotelDetail.data.address}
                    <div className="text-md mx-5">District: {hotelDetail.data.district}</div>
                    <div className="text-md mx-5">Province: {hotelDetail.data.province}</div>
                    <div className="text-md mx-5">Postalcode: {hotelDetail.data.postalcode}</div>
                    <div className="text-md mx-5">Tel: {hotelDetail.data.tel}</div>
                    
                    <Link href={`/booking?id=${params.hid}&name=${hotelDetail.data.name}`}>
                        <button className="my-2 block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                            Make Booking
                        </button>
                    </Link>
                    {
                        profile.data.role == 'admin' ? (
                            <AdminHotelButton hotel={hotelData} token={session.user.token} hid={params.hid}/>
                        ) : null
                    }
                </div>
            </div>
        </main>
    )
}