'use client'
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"


export default function DateReserve({ setDateChange, defaultDate }: { setDateChange: Function , defaultDate?: string}) {
    return(
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-5 w-fit px-10  py-5 flex flex-col justify-center">

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {
                    defaultDate? <DatePicker 
                                        label="Reservation Date" 
                                        className="bg-white" 
                                        onChange={(value) => setDateChange(value)}
                                        defaultValue={dayjs(defaultDate, 'YYYY/MM/DD')} // Set default value here
                                    />
                                :
                                <DatePicker 
                                    label="Reservation Date" 
                                    className="bg-white" 
                                    onChange={(value) => setDateChange(value)}
                                />
                } 
            </LocalizationProvider>

        </div>
    )
}