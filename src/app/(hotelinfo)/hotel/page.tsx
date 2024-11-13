import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { HotelJson } from "../../../../interface"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function Hotel() {
    revalidateTag('hotels')
    const hotels:Promise<HotelJson> = await getHotels()

    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <HotelCatalog hotelJson={hotels}/>
            </Suspense>
        </main>
    )
}