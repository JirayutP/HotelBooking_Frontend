'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function ProductCard({hotelName, imgSrc, onCompare, updateRating}:{hotelName:string, imgSrc:string, onCompare?:Function, updateRating?:Function}) {
    
    const  [rating, setRating] = useState<number|null>(0)

    return(
        <InteractiveCard contentName={hotelName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[15%] p-[10px]'>
                {hotelName}
            </div>
            <div className='flex flex-row'>
                {
                    onCompare? <button className='block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm'
                                    onClick={(e)=>{e.stopPropagation(); e.preventDefault(); onCompare(hotelName)}}>Compare</button>
                            :''
                }
                {
                    updateRating?  <Rating
                                        className='p-[10px]'
                                        id = {hotelName + ' Rating'}
                                        name={hotelName + ' Rating'}
                                        data-testid={hotelName + ' Rating'}
                                        value={rating}
                                        onClick={(e)=>{e.stopPropagation();}}
                                        onChange={(e, newRating) => {
                                            setRating(newRating)
                                            updateRating(hotelName,newRating)
                                        }}
                                    />
                                :''
                }
            </div>
        </InteractiveCard>
    );
}