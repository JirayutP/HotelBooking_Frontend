'use client'
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"


export default function DateReserve({ setDateChange }: { setDateChange: Function }) {
    return(
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-5 w-fit px-10  py-5 flex flex-col justify-center">

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Reservation Date" className="bg-white" onChange={(value) => setDateChange(value)}/>
            </LocalizationProvider>

        </div>
    )
}