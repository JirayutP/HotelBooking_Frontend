export default async function getBookingsById(id:string, token:string) {
  
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
  
    return await response.json();
  
  }