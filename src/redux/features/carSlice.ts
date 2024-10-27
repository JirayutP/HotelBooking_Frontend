import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReservationItem } from "../../../interface"

type CarState = {
    carItems: ReservationItem[]
}

const initialState:CarState = { carItems:[] }

export const carSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<ReservationItem>)=>{
            state.carItems.push(action.payload)
        },
        removeReservation: (state, action:PayloadAction<ReservationItem>)=>{
            const remainItems = state.carItems.filter( obj=>{
                return ((obj.carModel !== action.payload.carModel)
                        ||(obj.pickupDate !== action.payload.pickupDate)
                        ||(obj.returnDate !== action.payload.returnDate))
            })
            state.carItems = remainItems
        }
    }
})

export const {addReservation, removeReservation} = carSlice.actions
export default carSlice.reducer