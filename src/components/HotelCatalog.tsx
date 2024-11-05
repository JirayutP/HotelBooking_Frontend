'use client'
import Link from "next/link";
import Card from "./Card";
// import { useReducer } from "react";


export default async function HotelCatalog({hotelJson}: {hotelJson:Object}){
    const hotelJsonReady = await hotelJson

    // const compareReducer = (compareList:Set<string>, action:{type:string, carName:string})=>{
    //     switch(action.type){
    //         case 'add':{
    //             return new Set(compareList.add(action.carName))
    //         }
    //         case 'remove':{
    //             compareList.delete(action.carName)
    //             return new Set(compareList)
    //         }
    //         default: return compareList
    //     }
    // }
    // const [compareList, dispatchCompare] = useReducer(compareReducer, new Set<string>())

    // const ratingReducer = (ratingList:Map<string, number>, action:{type:string, hospitalName:string, rating:number})=>{
    //     switch(action.type){
    //         case 'update':{
    //             if (action.rating == null){
    //                 action.rating = 0
    //             }
    //             return new Map(ratingList.set(action.hospitalName, action.rating))
    //         }
    //         case 'remove':{
    //             ratingList.delete(action.hospitalName)
    //             return new Map(ratingList)
    //         }
    //         default: return ratingList
    //     }
    // }
    // const  [ratingList, dispatchRating] = useReducer(ratingReducer, new Map<string, number>([]))
    
    return(
        <>
        Explore {hotelJsonReady.count} hotels in our catalog
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around", padding:'10px'}}>
                {
                    hotelJsonReady.data.map((hotelItem:Object)=>(
                        <Link href={`/hotel/${hotelItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                                                                     p-2 sm:p-4 md:p-4 lg:p-8">
                            <Card hotelName={hotelItem.name} imgSrc={hotelItem.picture}
                            // onCompare={(hotel:string)=>dispatchCompare({type:'add', hotelName:hotel})}
                            // updateRating={(hotel:string,rate:number)=>dispatchRating({type:'update', hotelName:hotel, rating:rate})}
                            />
                        </Link>
                        
                    ))
                }
            </div>
        </>
    )
}