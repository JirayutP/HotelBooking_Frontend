export default async function deleteBooking(id:string,token:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  
    if (!response.ok) {
      alert("Failed to delete booking");
      // throw new Error("Failed to delete booking");
    }
    return await response.json();
  
  }