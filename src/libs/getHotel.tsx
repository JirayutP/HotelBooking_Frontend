export default async function getHospital(id:string) {
    const response = await fetch(`https://hotel-booking-backend-sage.vercel.app/api/v1/hotels/${id}`)
    if(!response.ok){
        throw new Error('Failed to fetch hotel')
    }
    return await response.json()
}