'use client'
import Link from "next/link";
import Card from "./Card";
import { useReducer } from "react";

export default async function HotelCatalog({hotelJson}: {hotelJson:Object}){

    const ratingReducer = (ratingList:Map<string, number>, action:{type:string, hotelName:string, rating:number})=>{
        switch(action.type){
            case 'update':{
                if (action.rating == null){
                    action.rating = 0
                }
                return new Map(ratingList.set(action.hotelName, action.rating))
            }
            case 'remove':{
                ratingList.delete(action.hotelName)
                return new Map(ratingList)
            }
            default: return ratingList
        }
    }
    const  [ratingList, dispatchRating] = useReducer(ratingReducer, new Map<string, number>([]))
    

    const compareReducer = (compareList:Set<string>, action:{type:string, hotelName:string})=>{
        switch(action.type){
            case 'add':{
                return new Set(compareList.add(action.hotelName))
            }
            case 'remove':{
                compareList.delete(action.hotelName)
                return new Set(compareList)
            }
            default: return compareList
        }
    }

    const [compareList, dispatchCompare] = useReducer(compareReducer, new Set<string>())
    
    const hotelJsonReady = await hotelJson
    
    return(
        <>
            Explore {hotelJsonReady.count} hotels in our catalog
            <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around", padding:'10px'}}>
                {
                    hotelJsonReady.data.map((hotelItem:Object)=>(
                        <Link href={`/hotel/${hotelItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                                                                        p-2 sm:p-4 md:p-4 lg:p-8">
                            <Card hotelName={hotelItem.name} imgSrc={hotelItem.picture}
                            onCompare={(hotel:string)=>dispatchCompare({type:'add', hotelName:hotel})}
                            updateRating={(hotel:string,rate:number)=>dispatchRating({type:'update', hotelName:hotel, rating:rate})}
                            />
                        </Link>
                        
                    ))
                }
            </div>
            <div className="w-full text-xl font-medium">Compare List: {compareList.size}</div>
            {Array.from(compareList).map((hospital)=><div key={hospital} 
                onClick={()=>dispatchCompare({type:'remove', hotelName:hospital})}>
                {hospital}</div>)}

            <div className="w-full text-xl font-medium px-10">Hotel List with Ratings : {ratingList.size}</div>
            {Array.from(ratingList).map((hotelWithRate)=><div 
                className="px-10" 
                key={hotelWithRate[0]} 
                data-testid={hotelWithRate[0]}
                onClick={()=>{
                    dispatchRating({type:'remove', hotelName:hotelWithRate[0], rating:hotelWithRate[1]})
                }}
                >{hotelWithRate[0]} : {hotelWithRate[1]}</div>)}
        </>
    )
}