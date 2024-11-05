export default async function getHotels() {
    
    await new Promise((resolve)=>setTimeout(resolve, 5000))
    
    const response = await fetch('https://hotel-booking-backend-sage.vercel.app/api/v1/hotels', { next: { tags:['hotels']}})
    if(!response.ok){
        throw new Error('Failed to fetch hotels')
    }
    return await response.json()
}