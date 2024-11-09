import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import { HotelJson } from "../../../../interface"

export default async function Hotel() {

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