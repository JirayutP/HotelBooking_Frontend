import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CardPanel from "@/components/CardPanel"

export default function Hotel() {

    const hotels = getHotels()
    
    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <HotelCatalog hotelJson={hotels}/>
            </Suspense>

            <hr className="my-10"/>
            <h1 className="text-xl font-medium">Try Client-side Hotel Panel</h1>
            <CardPanel/>
        </main>
    )
}