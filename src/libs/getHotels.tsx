export default async function getHotels() {
    
    // await new Promise((resolve)=>setTimeout(resolve, 5000))
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels`, { next: { tags:['hotels']}})
    if(!response.ok){
        alert("Failed to fetch hotels");
        // throw new Error('Failed to fetch hotels')
    }
    return await response.json()
}