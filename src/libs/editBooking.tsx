export default async function editBooking(id:string,token:string,newCheckIn:string,newCheckOut:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingDate: newCheckIn,
        checkoutDate: newCheckOut
      }),
    })
  
    if (!response.ok) {
      alert("Failed to delete booking");
      // throw new Error("Failed to delete booking");
    }
    return await response.json();
  
  }