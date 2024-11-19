export default async function getAllBookings(token:string) {
  
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      alert("Failed to fetch bookings");
      // throw new Error("Failed to fetch bookings");
    }
  
    return await response.json();
  
  }