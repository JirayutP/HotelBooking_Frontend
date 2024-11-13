export default async function getHospital(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${id}`, { next: { tags:['hotel']}})
    if(!response.ok){
        throw new Error('Failed to fetch hotel')
    }
    return await response.json()
}