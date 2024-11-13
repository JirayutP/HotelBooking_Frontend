"use client"
import deleteHotel from "@/libs/deleteHotel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HotelItem } from "../../interface";

export default function AdminHotelButton({ hotel, token, hid }: { hotel: HotelItem, token: string, hid: string }) {
    const router = useRouter();

    const handleDeleteHotel = async () => {
        const response = await deleteHotel(hid, token);
        if (response.success) {
            router.push('/hotel')
            router.refresh();
            alert(`Delete hotel: ${hotel.name} success`);
        }
    };

    return (
        <>
            <button className="my-2 block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={handleDeleteHotel}>
                Delete Hotel
            </button>
            <Link href={`/edithotel?hotelData=${encodeURIComponent(JSON.stringify(hotel))}&token=${token}`}>
                <button className="my-2 block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">
                    Edit Hotel
                </button>
            </Link>
        </>
    );
}